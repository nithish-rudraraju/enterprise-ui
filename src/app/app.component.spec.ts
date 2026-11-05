import { AppComponent } from './app.component';
import { RequestStoreService } from './services/request-store.service';

describe('AppComponent request workflow', () => {
  let saved: unknown;
  let app: AppComponent;

  beforeEach(() => {
    saved = undefined;
    const store = {
      getAll: () => [
        { id: 'SR-1', citizenName: 'Amelia Brooks', email: 'amelia@example.com', phone: '', category: 'Road maintenance', description: 'Road issue', priority: 'High', submitted: '2026-11-04', department: 'Transportation', status: 'Open', updated: 'Today' },
        { id: 'SR-2', citizenName: 'Marcus Chen', email: 'marcus@example.com', phone: '', category: 'Waste services', description: 'Collection', priority: 'Normal', submitted: '2026-11-03', department: 'Public Works', status: 'Pending', updated: 'Yesterday' }
      ],
      saveAll: (requests: unknown) => { saved = requests; }
    } as unknown as RequestStoreService;
    app = new AppComponent(store);
  });

  it('shows request counts and filters by text, status, and priority', () => {
    expect(app.requests.length).toBe(2);
    expect(app.openCount).toBe(1);
    app.query = 'amelia';
    expect(app.filtered.map(request => request.id)).toEqual(['SR-1']);
    app.query = '';
    app.statusFilter = 'Pending';
    expect(app.filtered.map(request => request.id)).toEqual(['SR-2']);
    app.statusFilter = 'All statuses';
    app.priorityFilter = 'High';
    expect(app.filtered.map(request => request.id)).toEqual(['SR-1']);
  });

  it('updates status and persists the changed records', () => {
    app.setStatus(app.requests[0], 'Resolved');
    expect(app.requests[0].status).toBe('Resolved');
    expect(saved).toBe(app.requests);
  });

  it('creates a request and persists it', () => {
    app.form = { citizenName: 'Riley Jones', email: 'riley@example.com', phone: '', category: 'Water services', description: 'Meter review', priority: 'Normal', submitted: '2026-11-05', department: 'Utilities', status: 'Open' };
    app.saveRequest();
    expect(app.requests.length).toBe(3);
    expect(app.requests[0].citizenName).toBe('Riley Jones');
    expect(saved).toBe(app.requests);
  });
});
