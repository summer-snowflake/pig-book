# frozen_string_literal: true

class YearlyBalanceTable::Updater
  def initialize(user:)
    @user = user
  end

  def update!
    @user.present_years.each do |year|
      update_total!(year)
    end
  end

  private

  def update_total!(year)
    fetcher =
      MonthlyBalanceTable::Fetcher.new(user: @user, year: year)
    yearly = find_yearly(year: year, balance_of_payments: true)
    yearly.update!(charge: fetcher.total_income)

    yearly = find_yearly(year: year, balance_of_payments: false)
    yearly.update!(charge: fetcher.total_expenditure)
  end

  def update_category_total!(year)
    grouping_records = the_year_records(year).group_by(&:category_id)
    grouping_records.each do |key, records|
      yearly = @user.yearly_balance_tables.find_or_initialize_by(
        year: year, currency: @user.current_currency, category_id: key
      )
      yearly.update!(
        income: sum_charge(incomes(records)),
        expenditure: sum_charge(expenditure(records))
      )
    end
  end

  def find_yearly(year:, balance_of_payments:, category: nil)
    @user.yearly_balance_tables.find_or_initialize_by(
      year: year,
      balance_of_payments: balance_of_payments,
      category: category,
      currency: @user.base_setting.currency
    )
  end

  def the_year_records(year)
    @user.records.current_currency(@user).the_year(year)
  end

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
