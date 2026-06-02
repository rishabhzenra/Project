import type {
  Widget, Account, Transaction, UserProfile,
  Offer, FixedDeposit, Loan, BillCategory,
} from '../types';

const BEECEPTOR = 'https://onestack-bank.free.beeceptor.com/api/v1';
const GIST = 'https://gist.githubusercontent.com/rishabhzenra/bff157afa6214e490f3662752886f485/raw';

async function get<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json();
}

export const api = {
  getHomeWidgets: () => get<Widget[]>(`${BEECEPTOR}/home-widgets`),
  getUserProfile: () => get<UserProfile[]>(`${BEECEPTOR}/user`).then(r => r[0]),
  getAccounts: () => get<Account[]>(`${GIST}/accounts.json`),
  getTransactions: () => get<Transaction[]>(`${GIST}/transactions.json`),
  getOffers: () => get<Offer[]>(`${GIST}/offers.json`),
  getFixedDeposits: () => get<FixedDeposit[]>(`${GIST}/fixed-deposits.json`),
  getLoans: () => get<Loan[]>(`${GIST}/loans.json`),
  getBillCategories: () => get<BillCategory[]>(`${GIST}/bill-categories.json`),
};
