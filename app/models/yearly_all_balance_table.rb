# frozen_string_literal: true

class YearlyAllBalanceTable < YearlyBalanceTable
  def income
    charge if balance_of_payments?
  end

  def expenditure
    charge if !balance_of_payments?
  end
end
