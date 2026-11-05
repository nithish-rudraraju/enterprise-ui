import { Injectable } from '@angular/core';
import { ServiceRequest } from '../models/service-request';

const DEMO_REQUESTS: ServiceRequest[] = [
  { id: 'SR-2026-1048', citizenName: 'Amelia Brooks', email: 'amelia.brooks@example.com', phone: '(515) 555-0142', category: 'Road maintenance', description: 'Pothole on the northbound lane near 4th Street and Walnut Avenue.', priority: 'High', submitted: '2026-11-04', department: 'Transportation', status: 'Open', updated: 'Today, 9:42 AM' },
  { id: 'SR-2026-1047', citizenName: 'Marcus Chen', email: 'marcus.chen@example.com', phone: '(319) 555-0188', category: 'Waste services', description: 'Missed recycling collection at the address on file.', priority: 'Normal', submitted: '2026-11-04', department: 'Public Works', status: 'Pending', updated: 'Today, 8:16 AM' },
  { id: 'SR-2026-1046', citizenName: 'Sofia Ramirez', email: 'sofia.ramirez@example.com', phone: '(712) 555-0126', category: 'Water services', description: 'Request for a water meter inspection following unusually high usage.', priority: 'Normal', submitted: '2026-11-03', department: 'Utilities', status: 'Open', updated: 'Yesterday, 3:28 PM' },
  { id: 'SR-2026-1045', citizenName: 'Ethan Walker', email: 'ethan.walker@example.com', phone: '(563) 555-0175', category: 'Permits and licensing', description: 'Clarification requested on residential renovation permit requirements.', priority: 'Low', submitted: '2026-11-03', department: 'Community Development', status: 'Resolved', updated: 'Yesterday, 1:02 PM' },
  { id: 'SR-2026-1044', citizenName: 'Olivia Patel', email: 'olivia.patel@example.com', phone: '(515) 555-0193', category: 'Public safety', description: 'Streetlight is out at the intersection by the community center.', priority: 'High', submitted: '2026-11-02', department: 'Public Safety', status: 'Pending', updated: 'Nov 4, 11:10 AM' },
  { id: 'SR-2026-1043', citizenName: 'Noah Thompson', email: 'noah.thompson@example.com', phone: '(641) 555-0104', category: 'Road maintenance', description: 'Request for a pedestrian crossing assessment near the elementary school.', priority: 'Urgent', submitted: '2026-11-02', department: 'Transportation', status: 'Open', updated: 'Nov 4, 10:22 AM' },
  { id: 'SR-2026-1042', citizenName: 'Isabella Davis', email: 'isabella.davis@example.com', phone: '(319) 555-0167', category: 'Parks and recreation', description: 'Playground swing needs repair at Riverside Park.', priority: 'Normal', submitted: '2026-11-01', department: 'Parks and Recreation', status: 'Resolved', updated: 'Nov 3, 4:51 PM' },
  { id: 'SR-2026-1041', citizenName: 'James Wilson', email: 'james.wilson@example.com', phone: '(515) 555-0139', category: 'Water services', description: 'Possible leak reported near a public water connection.', priority: 'High', submitted: '2026-10-31', department: 'Utilities', status: 'Pending', updated: 'Nov 3, 2:19 PM' }
];

@Injectable({ providedIn: 'root' })
export class RequestStoreService {
  private readonly key = 'iowa-service-portal-requests-v1';

  getAll(): ServiceRequest[] {
    try {
      const saved = localStorage.getItem(this.key);
      if (saved) return JSON.parse(saved) as ServiceRequest[];
    } catch { /* Storage can be unavailable in private browsing. */ }
    return DEMO_REQUESTS.map(request => ({ ...request }));
  }

  saveAll(requests: ServiceRequest[]): void {
    try { localStorage.setItem(this.key, JSON.stringify(requests)); } catch { /* Keep the current session usable. */ }
  }
}
