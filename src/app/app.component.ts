import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Priority, RequestStatus, ServiceRequest } from './models/service-request';
import { RequestStoreService } from './services/request-store.service';

@Component({
  selector: 'app-root', standalone: true, imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html', styleUrl: './app.component.scss'
})
export class AppComponent {
  readonly Math = Math;
  @ViewChild('firstField') firstField?: ElementRef<HTMLInputElement>;
  requests: ServiceRequest[];
  query = '';
  statusFilter = 'All statuses';
  priorityFilter = 'All priorities';
  sortBy: keyof ServiceRequest = 'submitted';
  ascending = false;
  page = 1;
  pageSize = 5;
  activeView = 'Dashboard';
  selected: ServiceRequest | null = null;
  showForm = false;
  mobileNavOpen = false;
  notice = '';
  formError = '';
  editId: string | null = null;
  private dialogOpener: HTMLElement | null = null;
  form: Omit<ServiceRequest, 'id' | 'updated'> = this.blankForm();

  constructor(private readonly store: RequestStoreService) { this.requests = store.getAll(); }
  get openCount(): number { return this.requests.filter(r => r.status === 'Open').length; }
  get pendingCount(): number { return this.requests.filter(r => r.status === 'Pending').length; }
  get resolvedCount(): number { return this.requests.filter(r => r.status === 'Resolved').length; }
  get filtered(): ServiceRequest[] {
    const q = this.query.trim().toLowerCase();
    return this.requests.filter(r => (!q || `${r.id} ${r.citizenName} ${r.category} ${r.department}`.toLowerCase().includes(q))
      && (this.statusFilter === 'All statuses' || r.status === this.statusFilter)
      && (this.priorityFilter === 'All priorities' || r.priority === this.priorityFilter))
      .sort((a, b) => String(a[this.sortBy]).localeCompare(String(b[this.sortBy])) * (this.ascending ? 1 : -1));
  }
  get pageCount(): number { return Math.max(1, Math.ceil(this.filtered.length / this.pageSize)); }
  get pageItems(): ServiceRequest[] { return this.filtered.slice((this.page - 1) * this.pageSize, this.page * this.pageSize); }
  get recent(): ServiceRequest[] { return [...this.requests].sort((a, b) => b.submitted.localeCompare(a.submitted)).slice(0, 4); }

  setView(view: string): void { this.activeView = view; this.selected = null; this.mobileNavOpen = false; this.page = 1; }
  toggleSort(key: keyof ServiceRequest): void { this.ascending = this.sortBy === key ? !this.ascending : true; this.sortBy = key; }
  openCreate(): void { this.dialogOpener = document.activeElement as HTMLElement; this.editId = null; this.form = this.blankForm(); this.formError = ''; this.showForm = true; setTimeout(() => this.firstField?.nativeElement.focus()); }
  openEdit(request: ServiceRequest): void { this.dialogOpener = document.activeElement as HTMLElement; this.editId = request.id; const { id, updated, ...values } = request; this.form = { ...values }; this.formError = ''; this.showForm = true; setTimeout(() => this.firstField?.nativeElement.focus()); }
  closeForm(): void { this.showForm = false; setTimeout(() => this.dialogOpener?.focus()); }
  saveRequest(): void {
    if (!this.form.citizenName.trim() || !this.form.email.trim() || !this.form.category || !this.form.description.trim() || !this.form.department) {
      this.formError = 'Complete all required fields before saving.'; setTimeout(() => this.firstField?.nativeElement.focus()); return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.form.email.trim())) {
      this.formError = 'Enter an email address in the format name@example.com.'; document.getElementById('citizenEmail')?.focus(); return;
    }
    const today = new Date().toISOString().slice(0, 10);
    if (this.editId) this.requests = this.requests.map(r => r.id === this.editId ? { ...this.form, id: this.editId, updated: 'Just now' } : r);
    else {
      const lastSerial = this.requests.reduce((highest, request) => Math.max(highest, Number(request.id.split('-').at(-1)) || 0), 1048);
      this.requests = [{ ...this.form, id: `SR-2026-${lastSerial + 1}`, submitted: this.form.submitted || today, updated: 'Just now' }, ...this.requests];
    }
    this.persist(); this.closeForm(); this.announce(this.editId ? 'Service request updated.' : 'Service request created.');
  }
  setStatus(request: ServiceRequest, status: RequestStatus): void { request.status = status; request.updated = 'Just now'; this.persist(); this.announce(`${request.id} status changed to ${status}.`); }
  deleteRequest(request: ServiceRequest): void {
    if (!window.confirm(`Delete request ${request.id} for ${request.citizenName}? This cannot be undone.`)) return;
    this.requests = this.requests.filter(r => r.id !== request.id); this.page = Math.min(this.page, this.pageCount); this.persist(); this.selected = null; this.announce(`${request.id} deleted.`);
  }
  openDetails(request: ServiceRequest): void { this.selected = request; this.activeView = 'Requests'; }
  announce(message: string): void { this.notice = message; setTimeout(() => { if (this.notice === message) this.notice = ''; }, 4000); }
  onKey(event: KeyboardEvent): void {
    if (event.key === 'Escape' && this.showForm) { event.preventDefault(); this.closeForm(); return; }
    if (event.key !== 'Tab' || !this.showForm) return;
    const dialog = document.querySelector<HTMLElement>('.request-dialog');
    const focusable = dialog ? Array.from(dialog.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])')) : [];
    if (!focusable.length) return;
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
  private persist(): void { this.store.saveAll(this.requests); }
  private blankForm(): Omit<ServiceRequest, 'id' | 'updated'> {
    return { citizenName: '', email: '', phone: '', category: '', description: '', priority: 'Normal', submitted: new Date().toISOString().slice(0, 10), department: '', status: 'Open' };
  }
}
