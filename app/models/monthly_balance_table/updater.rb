# frozen_string_literal: true

class MonthlyBalanceTable::Updater
  def initialize(user:)
    @user = user
    @grouping_records =
      @user.records.current_currency(user).includes(:category)
           .group_by { |record| record.published_at.to_s.slice(0..6) }
  end

  def update!
    @grouping_records.each do |key, records|
      monthly = MonthlyBalanceTable.find_or_initialize_by(
        user: @user, year_and_month: key
      )
      monthly.update!(
        currency: @user.base_setting.currency,
        income: sum_charge(incomes(records)),
        expenditure: sum_charge(expenditure(records))
      )
    end
  end

  def update_empty!
    return if @grouping_records.blank?

    empty_months.each do |empty_month|
      monthly = MonthlyBalanceTable.find_or_initialize_by(
        user: @user, year_and_month: empty_month
      )
      monthly.update!(
        currency: @user.base_setting.currency,
        income: 0, expenditure: 0
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

  def to_date(date)
    Date.new(date.slice(0..3).to_i, date.slice(5, 2).to_i, 1)
  end

  def empty_months
    oldest_date = to_date(@grouping_records.keys.min)
    newest_date = to_date(@grouping_records.keys.max)
    all_months = (oldest_date..newest_date)
                 .map(&:beginning_of_month).uniq.map { |b| b.to_s.slice(0..6) }

    all_months - @grouping_records.keys
  end
end
