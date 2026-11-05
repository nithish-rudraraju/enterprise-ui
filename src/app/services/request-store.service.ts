import { Injectable } from '@angular/core';
import { RequestActivity, RequestStatus, ServiceRequest } from '../models/service-request';

const DEMO_REQUESTS: ServiceRequest[] = [
  {
    id: 'SD-2026-1048', requesterName: 'Imran', email: 'imran@example.com', phone: '(555) 010-1048',
    category: 'Account access', description: 'Access to the quarterly reporting workspace is needed for the month-end review.',
    priority: 'High', submitted: '2026-11-04', department: 'IT Services', assignedTo: 'Nithish', status: 'Open', updated: 'Nov 4, 9:42 AM',
    activity: [
      { id: '1048-1', actorName: 'Imran', kind: 'submitted', message: 'Submitted a request for the quarterly reporting workspace.', at: '2026-11-04T09:05:00' },
      { id: '1048-2', actorName: 'Nithish', kind: 'assigned', message: 'Assigned the request to Nithish in IT Services.', at: '2026-11-04T09:18:00' },
      { id: '1048-3', actorName: 'Nithish', kind: 'comment', message: 'I’m checking the workspace group mapping and will confirm access.', at: '2026-11-04T09:42:00' }
    ]
  },
  {
    id: 'SD-2026-1047', requesterName: 'Arun', email: 'arun@example.com', phone: '(555) 010-1047',
    category: 'Hardware', description: 'Laptop battery drains before the end of a normal workday.',
    priority: 'Normal', submitted: '2026-11-04', department: 'Workplace', assignedTo: 'Chandra Babu', status: 'Pending', updated: 'Nov 4, 10:44 AM',
    activity: [
      { id: '1047-1', actorName: 'Arun', kind: 'submitted', message: 'Reported that the laptop battery no longer lasts through the workday.', at: '2026-11-04T08:03:00' },
      { id: '1047-2', actorName: 'Chandra Babu', kind: 'assigned', message: 'Picked up the hardware request for Workplace.', at: '2026-11-04T08:16:00' },
      { id: '1047-3', actorName: 'Chandra Babu', kind: 'comment', message: 'Could you share the device asset tag so I can check its warranty?', at: '2026-11-04T10:27:00' },
      { id: '1047-4', actorName: 'Arun', kind: 'comment', message: 'The asset tag is LT-2384. It shuts down around lunchtime.', at: '2026-11-04T10:44:00' }
    ]
  },
  {
    id: 'SD-2026-1046', requesterName: 'Kalyan', email: 'kalyan@example.com', phone: '(555) 010-1046',
    category: 'Software', description: 'Please add my account to the design review application before sprint planning.',
    priority: 'Normal', submitted: '2026-11-03', department: 'IT Services', assignedTo: 'Imran', status: 'Open', updated: 'Nov 3, 2:28 PM',
    activity: [
      { id: '1046-1', actorName: 'Kalyan', kind: 'submitted', message: 'Requested access to the design review application for sprint planning.', at: '2026-11-03T14:02:00' },
      { id: '1046-2', actorName: 'Imran', kind: 'assigned', message: 'Assigned the access request to himself for review.', at: '2026-11-03T14:10:00' },
      { id: '1046-3', actorName: 'Kalyan', kind: 'comment', message: 'I need the review workspace for sprint 12 estimates.', at: '2026-11-03T14:28:00' }
    ]
  },
  {
    id: 'SD-2026-1045', requesterName: 'Chandra Babu', email: 'chandrababu@example.com', phone: '(555) 010-1045',
    category: 'People operations', description: 'I changed banks and need help updating direct deposit details.',
    priority: 'Low', submitted: '2026-11-03', department: 'People Operations', assignedTo: 'Jagan', status: 'Resolved', updated: 'Nov 3, 1:02 PM',
    activity: [
      { id: '1045-1', actorName: 'Chandra Babu', kind: 'submitted', message: 'Asked how to update direct deposit details after changing banks.', at: '2026-11-03T09:00:00' },
      { id: '1045-2', actorName: 'Jagan', kind: 'assigned', message: 'Assigned the request to the People Operations queue.', at: '2026-11-03T09:17:00' },
      { id: '1045-3', actorName: 'Jagan', kind: 'comment', message: 'I sent the secure profile update steps to your work email.', at: '2026-11-03T10:08:00' },
      { id: '1045-4', actorName: 'Jagan', kind: 'status', message: 'Marked resolved after confirming the update instructions were received.', at: '2026-11-03T13:02:00' }
    ]
  },
  {
    id: 'SD-2026-1044', requesterName: 'Jagan', email: 'jagan@example.com', phone: '(555) 010-1044',
    category: 'Facilities', description: 'The display in Cedar meeting room will not connect to the conference system.',
    priority: 'High', submitted: '2026-11-02', department: 'Workplace', assignedTo: 'Kalyan', status: 'Pending', updated: 'Nov 4, 11:10 AM',
    activity: [
      { id: '1044-1', actorName: 'Jagan', kind: 'submitted', message: 'Reported a connection issue with the Cedar room display.', at: '2026-11-02T09:38:00' },
      { id: '1044-2', actorName: 'Kalyan', kind: 'assigned', message: 'Assigned the room equipment check to Kalyan.', at: '2026-11-02T10:05:00' },
      { id: '1044-3', actorName: 'Kalyan', kind: 'comment', message: 'The cable path is working; I’m checking the display dock firmware next.', at: '2026-11-04T11:10:00' }
    ]
  },
  {
    id: 'SD-2026-1043', requesterName: 'Chiranjeevi', email: 'chiranjeevi@example.com', phone: '(555) 010-1043',
    category: 'Network', description: 'Wi-Fi drops intermittently in the west collaboration area during video calls.',
    priority: 'Urgent', submitted: '2026-11-02', department: 'IT Services', assignedTo: 'Nithish', status: 'Open', updated: 'Nov 4, 10:22 AM',
    activity: [
      { id: '1043-1', actorName: 'Chiranjeevi', kind: 'submitted', message: 'Reported intermittent Wi-Fi drops during calls in the west collaboration area.', at: '2026-11-02T08:20:00' },
      { id: '1043-2', actorName: 'Nithish', kind: 'assigned', message: 'Assigned the network investigation to Nithish.', at: '2026-11-02T08:31:00' },
      { id: '1043-3', actorName: 'Nithish', kind: 'comment', message: 'We found packet loss near the west access point and are checking its channel load.', at: '2026-11-04T10:22:00' }
    ]
  },
  {
    id: 'SD-2026-1042', requesterName: 'Nithish', email: 'nithish@example.com', phone: '(555) 010-1042',
    category: 'Facilities', description: 'Desk chair in workstation B-14 no longer holds its height adjustment.',
    priority: 'Normal', submitted: '2026-11-01', department: 'Workplace', assignedTo: 'Arun', status: 'Resolved', updated: 'Nov 3, 4:51 PM',
    activity: [
      { id: '1042-1', actorName: 'Nithish', kind: 'submitted', message: 'Requested a repair for the chair at workstation B-14.', at: '2026-11-01T10:15:00' },
      { id: '1042-2', actorName: 'Arun', kind: 'assigned', message: 'Assigned the furniture repair to Arun.', at: '2026-11-02T08:30:00' },
      { id: '1042-3', actorName: 'Arun', kind: 'comment', message: 'Replaced the chair cylinder and tested the height adjustment.', at: '2026-11-03T16:25:00' },
      { id: '1042-4', actorName: 'Arun', kind: 'status', message: 'Resolved after confirming the chair holds its setting.', at: '2026-11-03T16:51:00' }
    ]
  },
  {
    id: 'SD-2026-1041', requesterName: 'Imran', email: 'imran@example.com', phone: '(555) 010-1041',
    category: 'Finance', description: 'The travel expense form returns an approval error when I submit the final report.',
    priority: 'High', submitted: '2026-10-31', department: 'Finance', assignedTo: 'Chandra Babu', status: 'Pending', updated: 'Nov 3, 2:19 PM',
    activity: [
      { id: '1041-1', actorName: 'Imran', kind: 'submitted', message: 'Reported an approval error on the final travel expense submission.', at: '2026-10-31T13:45:00' },
      { id: '1041-2', actorName: 'Chandra Babu', kind: 'assigned', message: 'Assigned the expense workflow issue to Chandra Babu.', at: '2026-11-01T09:00:00' },
      { id: '1041-3', actorName: 'Chandra Babu', kind: 'comment', message: 'I cleared a stale approver session. Please retry and tell me if the error returns.', at: '2026-11-03T14:19:00' }
    ]
  }
];

interface StoredRequest extends Partial<ServiceRequest> {
  citizenName?: string;
}

@Injectable({ providedIn: 'root' })
export class RequestStoreService {
  private readonly key = 'service-desk-requests-v1';
  private readonly legacyKey = 'iowa-service-portal-requests-v1';

  getAll(): ServiceRequest[] {
    try {
      const saved = localStorage.getItem(this.key);
      if (saved) return this.restore(JSON.parse(saved) as StoredRequest[]);

      const legacy = localStorage.getItem(this.legacyKey);
      if (legacy) {
        const migrated = this.restore(JSON.parse(legacy) as StoredRequest[]);
        this.saveAll(migrated);
        return migrated;
      }
    } catch {
      // Storage may be disabled or contain invalid data; the demo remains usable.
    }

    return DEMO_REQUESTS.map(request => ({ ...request, activity: [...request.activity] }));
  }

  saveAll(requests: ServiceRequest[]): void {
    try {
      localStorage.setItem(this.key, JSON.stringify(requests));
    } catch {
      // Keep the current session usable when storage is unavailable or full.
    }
  }

  private restore(stored: StoredRequest[]): ServiceRequest[] {
    return stored.map((record, index) => {
      const legacySampleId = record.id?.startsWith('SR-') ? record.id.replace(/^SR-/, 'SD-') : record.id;
      const sample = DEMO_REQUESTS.find(request => request.id === legacySampleId);
      if (sample) {
        if (record.id?.startsWith('SR-')) {
          return {
            ...sample,
            status: record.status ?? sample.status,
            priority: record.priority ?? sample.priority,
            submitted: record.submitted ?? sample.submitted,
            updated: record.updated ?? sample.updated
          };
        }
        return {
          ...sample,
          ...record,
          id: sample.id,
          requesterName: record.requesterName ?? sample.requesterName,
          assignedTo: record.assignedTo ?? sample.assignedTo,
          activity: record.activity?.length ? record.activity : sample.activity,
          status: record.status ?? sample.status,
          priority: record.priority ?? sample.priority,
          submitted: record.submitted ?? sample.submitted,
          updated: record.updated ?? sample.updated
        };
      }

      const requesterName = record.requesterName ?? record.citizenName ?? 'Nithish';
      const assignedTo = record.assignedTo ?? 'Nithish';
      const submitted = record.submitted ?? new Date().toISOString().slice(0, 10);
      const activity = record.activity?.length
        ? record.activity
        : this.createMigrationActivity(record.id ?? `SD-legacy-${index + 1}`, requesterName, assignedTo, submitted);

      return {
        id: record.id ?? `SD-legacy-${index + 1}`,
        requesterName,
        email: record.email ?? `${requesterName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
        phone: record.phone ?? '',
        category: record.category ?? 'Account access',
        description: record.description ?? 'Request details were not recorded.',
        priority: record.priority ?? 'Normal',
        submitted,
        department: record.department ?? 'IT Services',
        assignedTo,
        status: record.status ?? 'Open',
        updated: record.updated ?? 'Recently updated',
        activity
      };
    });
  }

  private createMigrationActivity(id: string, requesterName: string, assignedTo: string, submitted: string): RequestActivity[] {
    return [
      { id: `${id}-submitted`, actorName: requesterName, kind: 'submitted', message: 'Submitted this request.', at: `${submitted}T09:00:00` },
      { id: `${id}-assigned`, actorName: assignedTo, kind: 'assigned', message: `Assigned this request to ${assignedTo}.`, at: `${submitted}T09:15:00` }
    ];
  }
}
