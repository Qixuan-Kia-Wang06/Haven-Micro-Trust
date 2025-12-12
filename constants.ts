import { UserProfile, TrustContract, Transaction } from './types';

export const MOCK_SENIOR: UserProfile = {
  name: "Mrs. Zhang",
  age: 72,
  id: "USR-8821",
  role: "senior"
};

export const INITIAL_CONTRACT_STATE: TrustContract = {
  isActive: true,
  balance: 50000,
  monthlyAllowance: 2000,
  medicalTriggerEnabled: true,
  status: 'active',
  medicalStatus: 'healthy',
  planType: 'basic'
};

export const MOCK_PENDING_TX: Transaction = {
  id: "TX-992-ALPHA",
  amount: 15000,
  recipient: "Sunrise Care Facility",
  date: "2024-05-20",
  status: 'pending_multisig',
  requiresZKP: true
};

// Colors for reference in logic
export const COLORS = {
  primary: '#171717', // Neutral 900 (Black)
  secondary: '#d97706', // Amber 600 (Gold)
  background: '#fafafa', // Neutral 50
  alert: '#991b1b', // Red 800 (Deep Red)
  success: '#059669', // Emerald 600
};