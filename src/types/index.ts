export type WidgetType =
  | 'balance_card'
  | 'account_list'
  | 'quick_actions'
  | 'bill_payment'
  | 'recent_transactions'
  | 'fixed_deposits'
  | 'loan_info'
  | 'offers';

export interface Widget {
  id: string;
  type: WidgetType;
  title: string;
  icon: string;
  order: number;
  action: string;
  visible: boolean;
}

export interface Account {
  id: string;
  bankName: string;
  accountNumber: string;
  accountType: string;
  balance: number;
}

export interface Transaction {
  id: string;
  title: string;
  subtitle: string;
  amount: number;
  type: 'credit' | 'debit';
  date: string;
  category: string;
}

export interface UserProfile {
  id: string;
  name: string;
  upiId: string;
  phone: string;
  avatarUrl: string;
  netWorth: number;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  validTill: string;
  tag: string;
}

export interface FixedDeposit {
  id: string;
  bank: string;
  principal: number;
  interestRate: number;
  maturityDate: string;
  maturityAmount: number;
  status: string;
}

export interface Loan {
  id: string;
  type: string;
  principal: number;
  outstanding: number;
  emi: number;
  nextDueDate: string;
  status: string;
}

export interface BillCategory {
  id: string;
  label: string;
  icon: string;
  action: string;
}
