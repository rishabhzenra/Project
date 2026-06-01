import homeWidgets from '../../mockData/home-widgets.json';
import users from '../../mockData/user.json';
import accounts from '../../mockData/accounts.json';
import transactions from '../../mockData/transactions.json';
import offers from '../../mockData/offers.json';
import fixedDeposits from '../../mockData/fixed-deposits.json';
import loans from '../../mockData/loans.json';
import billCategories from '../../mockData/bill-categories.json';

import type {
  Widget, Account, Transaction, UserProfile,
  Offer, FixedDeposit, Loan, BillCategory,
} from '../types';

function delay<T>(data: T, ms = 400): Promise<T> {
  return new Promise(resolve => setTimeout(() => resolve(data), ms));
}

export const api = {
  getHomeWidgets: () => delay(homeWidgets as Widget[]),
  getAccounts: () => delay(accounts as Account[]),
  getTransactions: () => delay(transactions as Transaction[]),
  getUserProfile: () => delay((users as UserProfile[])[0]),
  getOffers: () => delay(offers as Offer[]),
  getFixedDeposits: () => delay(fixedDeposits as FixedDeposit[]),
  getLoans: () => delay(loans as Loan[]),
  getBillCategories: () => delay(billCategories as BillCategory[]),
};
