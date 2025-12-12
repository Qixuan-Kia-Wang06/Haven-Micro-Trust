export type ViewState = 'landing' | 'senior' | 'guardian';

export type PlanType = 'basic' | 'family';

export interface UserProfile {
  name: string;
  age: number;
  id: string;
  role: 'senior' | 'guardian';
}

export interface TrustContract {
  isActive: boolean;
  balance: number;
  monthlyAllowance: number;
  medicalTriggerEnabled: boolean;
  status: 'active' | 'protective_mode' | 'pending_setup';
  medicalStatus: 'healthy' | 'cognitive_decline_detected';
  planType: PlanType;
}

export interface Transaction {
  id: string;
  amount: number;
  recipient: string;
  date: string;
  status: 'approved' | 'pending_multisig' | 'rejected';
  requiresZKP: boolean;
}