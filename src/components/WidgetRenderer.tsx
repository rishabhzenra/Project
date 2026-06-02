import React from 'react';
import { Widget } from '../types';
import BalanceCardWidget from './widgets/BalanceCardWidget';
import AccountListWidget from './widgets/AccountListWidget';
import QuickActionsWidget from './widgets/QuickActionsWidget';
import BillPaymentWidget from './widgets/BillPaymentWidget';
import RecentTransactionsWidget from './widgets/RecentTransactionsWidget';
import FixedDepositsWidget from './widgets/FixedDepositsWidget';
import LoanInfoWidget from './widgets/LoanInfoWidget';
import OffersWidget from './widgets/OffersWidget';

interface Props {
  widget: Widget;
  navigation: any;
}

export default function WidgetRenderer({ widget, navigation }: Props) {
  switch (widget.type) {
    case 'balance_card':
      return <BalanceCardWidget widget={widget} navigation={navigation} />;
    case 'account_list':
      return <AccountListWidget widget={widget} navigation={navigation} />;
    case 'quick_actions':
      return <QuickActionsWidget widget={widget} navigation={navigation} />;
    case 'bill_payment':
      return <BillPaymentWidget widget={widget} navigation={navigation} />;
    case 'recent_transactions':
      return <RecentTransactionsWidget widget={widget} navigation={navigation} />;
    case 'fixed_deposits':
      return <FixedDepositsWidget widget={widget} navigation={navigation} />;
    case 'loan_info':
      return <LoanInfoWidget widget={widget} navigation={navigation} />;
    case 'offers':
      return <OffersWidget widget={widget} navigation={navigation} />;
    default:
      return null;
  }
}
