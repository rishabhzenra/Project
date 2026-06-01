const BASE = 'https://67fce2752c55e01d269e2fb9.mockapi.io/api/v1';

async function get<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${BASE}${endpoint}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export const api = {
  getHomeWidgets: () => get<import('../types').Widget[]>('/home-widgets'),
  getAccounts: () => get<import('../types').Account[]>('/accounts'),
  getTransactions: () => get<import('../types').Transaction[]>('/transactions'),
  getUserProfile: () => get<import('../types').UserProfile[]>('/user').then(r => r[0]),
  getOffers: () => get<import('../types').Offer[]>('/offers'),
  getFixedDeposits: () => get<import('../types').FixedDeposit[]>('/fixed-deposits'),
  getLoans: () => get<import('../types').Loan[]>('/loans'),
  getBillCategories: () => get<import('../types').BillCategory[]>('/bill-categories'),
};
