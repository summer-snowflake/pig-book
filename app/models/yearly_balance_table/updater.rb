# frozen_string_literal: true

class YearlyBalanceTable::Updater
  CATEGORY_OFFSET_NUMBER = 7

  def initialize(user:)
    @user = user
  end

  def update!
    @user.present_years.each do |year|
      update_total!(year)
      update_category_total!(year)
    end
  end

  private

  def update_total!(year)
    fetcher =
      MonthlyBalanceTable::Fetcher.new(user: @user, year: year)
    yearly = @user.yearly_all_balance_tables.find_or_initialize_by(
      year: year, currency: @user.base_setting.currency
    )
    yearly.update!(
      year: year,
      income: fetcher.total_income,
      expenditure: fetcher.total_expenditure
    )
  end

  def update_category_total!(year)
    grouping_records = the_year_records(year).group_by(&:category_id)
    grouping_records.each do |key, records|
      yearly = @user.yearly_category_balance_tables.find_or_initialize_by(
        year: year, currency: @user.current_currency, category_id: key
      )
      yearly.update!(charge: sum_charge(records),
                     balance_of_payments: yearly.category.balance_of_payments)
      update_breakdown_total!(year, key, records)
    end
    update_category_other!(year)
  end

  def update_category_other!(year)
    totals = @user.yearly_category_balance_tables
                  .where(currency: @user.base_setting.currency)
                  .where(year: year)
                  .order(charge: :desc)
    update_or_create(totals.income, CATEGORY_OFFSET_NUMBER)
    update_or_create(totals.expenditure, CATEGORY_OFFSET_NUMBER)
    update_breakdown_other!(year, totals)
  end

  def update_breakdown_total!(year, category_id, category_records)
    category_records.group_by(&:breakdown_id).each do |key, records|
      yearly = @user.yearly_breakdown_balance_tables.find_or_initialize_by(
        year: year, currency: @user.current_currency,
        category_id: category_id, breakdown_id: key
      )
      yearly.update!(charge: sum_charge(records),
                     balance_of_payments: yearly.category.balance_of_payments)
    end
  end

  def update_breakdown_other!(year, category_totals)
    yearly = @user.yearly_breakdown_balance_tables
                  .where(currency: @user.base_setting.currency)
                  .where(year: year)

    income_totals = category_totals.income.offset(CATEGORY_OFFSET_NUMBER)
    yearly.income.find_or_initialize_by(other: true)
          .update(charge: sum_charge(income_totals))

    expenditure_totals =
      category_totals.expenditure.offset(CATEGORY_OFFSET_NUMBER)
    yearly.expenditure.find_or_initialize_by(other: true)
          .update(charge: sum_charge(expenditure_totals))
  end

  def find_yearly(year:, balance_of_payments:)
    @user.yearly_all_balance_tables.find_or_initialize_by(
      year: year,
      balance_of_payments: balance_of_payments,
      currency: @user.base_setting.currency
    )
  end

  def update_or_create(yearly, offset_num)
    charge = sum_charge(yearly.offset(offset_num))
    return unless charge.positive?

    other_yearly = yearly.find_or_initialize_by(other: true)
    other_yearly.update(charge: charge)
  end

  def the_year_records(year)
    @user.records.current_currency(@user).the_year(year)
  end

  def sum_charge(records)
    records.inject(0) { |sum, record| sum + record.charge }
  end
end
