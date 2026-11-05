import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RequestStoreService } from './services/request-store.service';
import { ServiceRequest } from './models/service-request';

describe('AppComponent request workflow', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  let saved: ServiceRequest[] | undefined;

  beforeEach(async () => {
    saved = undefined;
    const store = {
      getAll: () => [
        { id: 'SD-2026-1002', requesterName: 'Arun', email: 'arun@example.com', phone: '', category: 'Hardware', description: 'Battery replacement', priority: 'Normal', submitted: '2026-11-03', department: 'Workplace', assignedTo: 'Chandra Babu', status: 'Pending', updated: 'Yesterday', activity: [] },
        { id: 'SD-2026-1001', requesterName: 'Kalyan', email: 'kalyan@example.com', phone: '', category: 'Account access', description: 'Workspace access', priority: 'High', submitted: '2026-11-04', department: 'IT Services', assignedTo: 'Imran', status: 'Open', updated: 'Today', activity: [] }
      ] satisfies ServiceRequest[],
      saveAll: (requests: ServiceRequest[]) => { saved = requests; }
    };

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [{ provide: RequestStoreService, useValue: store }]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('shows request counts and filters by text, status, and priority', () => {
    expect(app.requests.length).toBe(2);
    expect(app.openCount).toBe(1);
    app.query = 'kalyan';
    expect(app.filtered.map(request => request.id)).toEqual(['SD-2026-1001']);
    app.query = '';
    app.statusFilter = 'Pending';
    expect(app.filtered.map(request => request.id)).toEqual(['SD-2026-1002']);
    app.statusFilter = 'All statuses';
    app.priorityFilter = 'High';
    expect(app.filtered.map(request => request.id)).toEqual(['SD-2026-1001']);
  });

  it('updates status and persists the changed records', () => {
    app.setStatus(app.requests[0], 'Resolved');
    expect(app.requests[0].status).toBe('Resolved');
    expect(saved).toBe(app.requests);
  });

  it('creates a request and persists it', () => {
    app.form = { requesterName: 'Chiranjeevi', email: 'chiranjeevi@example.com', phone: '', category: 'Software', description: 'Application access', priority: 'Normal', submitted: '2026-11-05', department: 'IT Services', status: 'Open' };
    app.saveRequest();
    expect(app.requests.length).toBe(3);
    expect(app.requests[0].requesterName).toBe('Chiranjeevi');
    expect(app.requests[0].assignedTo).toBe('Nithish');
    expect(app.requests[0].id).toBe('SD-2026-1003');
    expect(saved).toBe(app.requests);
  });

  it('identifies invalid required fields and malformed email addresses', () => {
    app.form = { ...app.form, requesterName: ' ', email: 'not-an-email', category: '', description: '', department: '' };
    app.saveRequest();
    expect(app.formError).toContain('attention');
    expect(app.fieldErrors.requesterName).toBeDefined();
    expect(app.fieldErrors.email).toContain('name@example.com');
    expect(app.fieldErrors.category).toBeDefined();
    expect(saved).toBeUndefined();
  });

  afterEach(() => fixture.destroy());
});
