// User Types
export interface User {
  id: string;
  email: string;
  university: string;
  createdAt: Date;
  emergencyFundGoal?: number;
  plaidAccessToken?: string;
}

// Transaction Types
export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  date: Date;
  description: string;
  category: TransactionCategory;
  merchantName?: string;
  isRecurring: boolean;
  plaidTransactionId?: string;
}

export enum TransactionCategory {
  FOOD_DINING = 'Food & Dining',
  TEXTBOOKS = 'Textbooks & Course Materials',
  SOCIAL_ENTERTAINMENT = 'Social & Entertainment',
  TRANSPORTATION = 'Transportation',
  HOUSING_UTILITIES = 'Housing & Utilities',
  HEALTH_WELLNESS = 'Health & Wellness',
  PERSONAL_CARE = 'Personal Care',
  SUBSCRIPTIONS = 'Subscriptions',
  OTHER = 'Other'
}

// Peer Insights Types
export interface PeerInsight {
  category: TransactionCategory;
  userSpending: number;
  peerAverage: number;
  sampleSize: number;
  university: string;
  period: 'week' | 'month';
  comparison: 'above' | 'below' | 'similar';
}

// Student Deal Types
export interface StudentDeal {
  id: string;
  businessName: string;
  category: string;
  discountAmount: string;
  description: string;
  location: string;
  distanceFromCampus: number;
  verificationMethod: 'student_id' | 'email' | 'other';
  expirationDate?: Date;
  terms: string;
}

// Emergency Fund Types
export interface EmergencyFund {
  userId: string;
  goalAmount: number;
  currentAmount: number;
  milestones: FundMilestone[];
}

export interface FundMilestone {
  amount: number;
  description: string;
  reached: boolean;
  reachedDate?: Date;
}

// Savings Challenge Types
export interface SavingsChallenge {
  id: string;
  name: string;
  type: 'save_amount' | 'limit_category';
  targetAmount?: number;
  category?: TransactionCategory;
  weeklyLimit?: number;
  startDate: Date;
  endDate: Date;
  creatorId: string;
  participants: ChallengeParticipant[];
  isPrivate: boolean;
}

export interface ChallengeParticipant {
  userId: string;
  userName: string;
  progress: number;
  rank: number;
}

// Spending Summary Types
export interface SpendingSummary {
  userId: string;
  period: 'week' | 'month' | 'semester';
  totalSpent: number;
  byCategory: CategorySpending[];
  projectedEndOfPeriod: number;
}

export interface CategorySpending {
  category: TransactionCategory;
  amount: number;
  percentage: number;
  transactionCount: number;
}
