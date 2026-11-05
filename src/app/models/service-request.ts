export type RequestStatus = 'Open' | 'Pending' | 'Resolved';
export type Priority = 'Low' | 'Normal' | 'High' | 'Urgent';

export interface ServiceRequest {
  id: string;
  citizenName: string;
  email: string;
  phone: string;
  category: string;
  description: string;
  priority: Priority;
  submitted: string;
  department: string;
  status: RequestStatus;
  updated: string;
}
