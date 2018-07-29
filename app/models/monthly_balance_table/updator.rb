# frozen_string_literal: true

class MonthlyBalanceTable::Updator
  def initialize(user:)
    @user = user
    @grouping_records =
      @user.records.current_currency(user).includes(:category)
           .group_by { |record| record.published_at.beginning_of_month }
  end

  def update!
    @grouping_records.each do |key, records|
      monthly = MonthlyBalanceTable
                .find_or_initialize_by(user: @user, beginning_at: key)
      monthly.update!(
        currency: @user.base_setting.currency,
        income: sum_charge(incomes(records)),
        expenditure: sum_charge(expenditure(records))
      )
    end
  end

  private

  def incomes(records)
    records.select { |record| record.category.balance_of_payments? }
  end

  def expenditure(records)
    records.reject { |record| record.category.balance_of_payments? }
  end

  def sum_charge(records)
    records.inject(0) { |sum, record| sum + record.charge }
  end
end
