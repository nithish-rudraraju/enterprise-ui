export type RequestStatus = 'Open' | 'Pending' | 'Resolved';
export type Priority = 'Low' | 'Normal' | 'High' | 'Urgent';
export type ActivityKind = 'submitted' | 'assigned' | 'comment' | 'status' | 'updated';

export interface RequestActivity {
  id: string;
  actorName: string;
  kind: ActivityKind;
  message: string;
  at: string;
}

export interface ServiceRequest {
  id: string;
  requesterName: string;
  email: string;
  phone: string;
  category: string;
  description: string;
  priority: Priority;
  submitted: string;
  department: string;
  assignedTo: string;
  status: RequestStatus;
  updated: string;
  activity: RequestActivity[];
}
