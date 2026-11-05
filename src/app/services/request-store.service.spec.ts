import { TestBed } from '@angular/core/testing';
import { RequestStoreService } from './request-store.service';

describe('RequestStoreService', () => {
  let service: RequestStoreService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ providers: [RequestStoreService] });
    service = TestBed.inject(RequestStoreService);
  });

  afterEach(() => localStorage.clear());

  it('loads demo requests when storage is empty', () => {
    const requests = service.getAll();
    expect(requests.length).toBeGreaterThan(0);
    expect(requests[0].requesterName).toBeTruthy();
  });

  it('migrates records from the previous storage key and requester field', () => {
    localStorage.setItem('iowa-service-portal-requests-v1', JSON.stringify([
      { id: 'SR-legacy-55', citizenName: 'Kalyan', email: 'kalyan@example.com', phone: '', category: 'Facilities', description: 'Legacy request', priority: 'Normal', submitted: '2026-11-04', department: 'Workplace', status: 'Open', updated: 'Today' }
    ]));

    const requests = service.getAll();
    expect(requests[0].requesterName).toBe('Kalyan');
    expect(localStorage.getItem('service-desk-requests-v1')).toContain('Kalyan');
  });
});
