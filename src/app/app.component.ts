import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Priority, RequestActivity, RequestStatus, ServiceRequest } from './models/service-request';
import { RequestStoreService } from './services/request-store.service';

type PageView = 'Dashboard' | 'Requests';
type RequestForm = Omit<ServiceRequest, 'id' | 'updated' | 'assignedTo' | 'activity'>;
type RequestFormField = keyof RequestForm;
type ActivityFeedItem = RequestActivity & { requestId: string; request: ServiceRequest };

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild('firstField') firstField?: ElementRef<HTMLInputElement>;
  @ViewChild('requestDialog') set requestDialog(element: ElementRef<HTMLDialogElement> | undefined) {
    if (element && !element.nativeElement.open) {
      element.nativeElement.showModal();
      this.focusFirstField();
    } else if (!element && this.dialogOpener) {
      const opener = this.dialogOpener;
      window.setTimeout(() => opener.focus(), 150);
    }
  }

  private readonly store = inject(RequestStoreService);
  private dialogOpener: HTMLElement | null = null;

  requests: ServiceRequest[] = this.store.getAll();
  query = '';
  statusFilter = 'All statuses';
  priorityFilter = 'All priorities';
  sortBy: keyof ServiceRequest = 'submitted';
  ascending = false;
  page = 1;
  readonly pageSize = 5;
  activeView: PageView = 'Dashboard';
  selected: ServiceRequest | null = null;
  showForm = false;
  mobileNavOpen = false;
  profileOpen = false;
  notice = '';
  formError = '';
  fieldErrors: Partial<Record<RequestFormField, string>> = {};
  editId: string | null = null;
  form: RequestForm = this.blankForm();

  get openCount(): number {
    return this.requests.filter(request => request.status === 'Open').length;
  }

  get pendingCount(): number {
    return this.requests.filter(request => request.status === 'Pending').length;
  }

  get resolvedCount(): number {
    return this.requests.filter(request => request.status === 'Resolved').length;
  }

  get filtered(): ServiceRequest[] {
    const query = this.query.trim().toLowerCase();
    return this.requests
      .filter(request => !query || `${request.id} ${request.requesterName} ${request.assignedTo} ${request.category} ${request.department}`.toLowerCase().includes(query))
      .filter(request => this.statusFilter === 'All statuses' || request.status === this.statusFilter)
      .filter(request => this.priorityFilter === 'All priorities' || request.priority === this.priorityFilter)
      .sort((left, right) => String(left[this.sortBy]).localeCompare(String(right[this.sortBy])) * (this.ascending ? 1 : -1));
  }

  get pageCount(): number {
    return Math.max(1, Math.ceil(this.filtered.length / this.pageSize));
  }

  get pageItems(): ServiceRequest[] {
    return this.filtered.slice((this.page - 1) * this.pageSize, this.page * this.pageSize);
  }

  get recent(): ServiceRequest[] {
    return [...this.requests].sort((left, right) => right.submitted.localeCompare(left.submitted)).slice(0, 4);
  }

  get recentActivity(): ActivityFeedItem[] {
    return this.requests.flatMap(request => request.activity.map(activity => ({ ...activity, requestId: request.id, request })))
      .sort((left, right) => right.at.localeCompare(left.at)).slice(0, 4);
  }

  initials(name: string): string {
    return name.trim().split(/\s+/).slice(0, 2).map(part => part.charAt(0)).join('').toUpperCase();
  }

  activityLabel(kind: RequestActivity['kind']): string {
    return ({ submitted: 'Submitted', assigned: 'Assigned', comment: 'Comment', status: 'Status update', updated: 'Updated' })[kind];
  }

  setView(view: PageView): void {
    this.activeView = view;
    this.selected = null;
    this.mobileNavOpen = false;
    this.profileOpen = false;
    this.page = 1;
  }

  toggleSort(key: keyof ServiceRequest): void {
    this.ascending = this.sortBy === key ? !this.ascending : true;
    this.sortBy = key;
  }

  openCreate(): void {
    this.dialogOpener = document.activeElement as HTMLElement;
    this.editId = null;
    this.form = this.blankForm();
    this.clearValidation();
    this.showForm = true;
    this.focusFirstField();
  }

  openEdit(request: ServiceRequest): void {
    this.dialogOpener = document.activeElement as HTMLElement;
    this.editId = request.id;
    const { id: _id, updated: _updated, assignedTo: _assignedTo, activity: _activity, ...values } = request;
    this.form = { ...values };
    this.clearValidation();
    this.showForm = true;
    this.focusFirstField();
  }

  closeForm(): void {
    this.showForm = false;
  }

  clearFieldError(field: RequestFormField): void {
    if (!this.fieldErrors[field]) return;
    const { [field]: _removed, ...remaining } = this.fieldErrors;
    this.fieldErrors = remaining;
    if (Object.keys(remaining).length === 0) this.formError = '';
  }

  saveRequest(): void {
    this.fieldErrors = this.validateForm();
    if (Object.keys(this.fieldErrors).length > 0) {
      this.formError = 'Some information needs attention. Review the fields marked below.';
      this.focusFirstInvalidField();
      return;
    }

    const wasEditing = this.editId !== null;
    const today = new Date().toISOString().slice(0, 10);
    if (this.editId) {
      const now = new Date().toISOString();
      this.requests = this.requests.map(request => request.id === this.editId
        ? { ...request, ...this.form, updated: 'Just now', activity: [...request.activity, { id: `activity-${now}`, actorName: 'Nithish', kind: 'updated', message: 'Updated the request details.', at: now }] }
        : request);
    } else {
      const lastSerial = this.requests.reduce((highest, request) => {
        const serial = Number(request.id.split('-').at(-1)) || 0;
        return Math.max(highest, serial);
      }, 0);
      const now = new Date().toISOString();
      const id = `SD-${new Date().getFullYear()}-${(lastSerial || 1040) + 1}`;
      this.requests = [{
        ...this.form,
        id,
        submitted: this.form.submitted || today,
        updated: 'Just now',
        assignedTo: 'Nithish',
        activity: [
          { id: `${id}-submitted`, actorName: this.form.requesterName, kind: 'submitted', message: 'Submitted the request.', at: now },
          { id: `${id}-assigned`, actorName: 'Nithish', kind: 'assigned', message: 'Assigned to Nithish.', at: now }
        ]
      }, ...this.requests];
    }

    this.store.saveAll(this.requests);
    this.closeForm();
    this.announce(wasEditing ? 'Request updated.' : 'Request created.');
  }

  setStatus(request: ServiceRequest, status: RequestStatus): void {
    request.status = status;
    request.updated = 'Just now';
    const now = new Date().toISOString();
    request.activity = [...request.activity, { id: `${request.id}-${now}`, actorName: 'Nithish', kind: 'status', message: `Changed status to ${status}.`, at: now }];
    this.store.saveAll(this.requests);
    this.announce(`${request.id} moved to ${status}.`);
  }

  deleteRequest(request: ServiceRequest): void {
    if (!window.confirm(`Delete request ${request.id} for ${request.requesterName}? This cannot be undone.`)) return;
    this.requests = this.requests.filter(item => item.id !== request.id);
    this.page = Math.min(this.page, this.pageCount);
    this.store.saveAll(this.requests);
    this.selected = null;
    this.announce(`${request.id} deleted.`);
  }

  openDetails(request: ServiceRequest): void {
    this.selected = request;
    this.activeView = 'Requests';
  }

  announce(message: string): void {
    this.notice = message;
    window.setTimeout(() => {
      if (this.notice === message) this.notice = '';
    }, 4000);
  }

  onDialogCancel(event: Event): void {
    event.preventDefault();
    this.closeForm();
  }

  private validateForm(): Partial<Record<RequestFormField, string>> {
    const errors: Partial<Record<RequestFormField, string>> = {};
    if (!this.form.requesterName.trim()) errors.requesterName = 'Enter the requester’s name.';
    if (!this.form.email.trim()) errors.email = 'Enter an email address.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email.trim())) errors.email = 'Enter an email address in the format name@example.com.';
    if (!this.form.category) errors.category = 'Choose a request category.';
    if (!this.form.description.trim()) errors.description = 'Describe the request.';
    if (!this.form.department) errors.department = 'Choose an assigned team.';
    return errors;
  }

  private clearValidation(): void {
    this.formError = '';
    this.fieldErrors = {};
  }

  private focusFirstField(): void {
    requestAnimationFrame(() => this.firstField?.nativeElement.focus());
  }

  private focusFirstInvalidField(): void {
    const firstInvalid = Object.keys(this.fieldErrors)[0] as RequestFormField | undefined;
    requestAnimationFrame(() => {
      document.querySelector<HTMLElement>(`.request-dialog [name="${firstInvalid}"]`)?.focus();
    });
  }

  private blankForm(): RequestForm {
    return {
      requesterName: '',
      email: '',
      phone: '',
      category: '',
      description: '',
      priority: 'Normal' satisfies Priority,
      submitted: new Date().toISOString().slice(0, 10),
      department: '',
      status: 'Open'
    };
  }
}
