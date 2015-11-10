
export interface corporateAccounts {
    id?: string;
    branch_name?: string;
    account_name?: string;
    country_iso_code?: string;
    local_currency_iso_code?: string;
    base_currency_balances?: baseCurrencyBalances,
    status?: string
}

export interface baseCurrencyBalances {
    currency?: string;
    opening_balance?: number;
    current_balance?: number;
    opening_ledger?: number;
    current_ledger?: number;
}

export interface corporateAccountPayment{
    id?: string,
    branch_name?: string,
    transaction_reference_number?: string,
    value_date?: string,
    email?: string,
    payment_method?: string,
    payment_currency?: string,
    payment_amount?: string,
    payment_type?: string,
    beneficiary_id?: string,
    debit_account_name?: string,
    debit_account_number?: string,
    created_by?: string,
    created_on?: string,
    customer_reference_number?: string,
    payment_details?: string,
    authorizer?: [
        {}
        ],
    releaser?: [
        {}
        ],
    status?: string
}