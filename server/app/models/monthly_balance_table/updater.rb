# frozen_string_literal: true

class MonthlyBalanceTable::Updater
  include ActiveModel::Model

  attr_reader :user, :year

  validates :year, numericality: { only_integer: true, greater_than: 0 }

  def initialize(user:)
    @user = user
  end

  def update(year:)
    @year = year

    [*1..12].each do |month|
      update_monthly(month)
    end
  end

  private

  def monthly_range(month)
    first_date = Date.new(year.to_i, month.to_i, 1).to_s
    beginning = Time.zone.parse(first_date).beginning_of_day
    Range.new(beginning, beginning.end_of_month.end_of_day)
  end

  def sum_charge(records)
    records.inject(0) { |sum, record| sum + record.charge }
  end

  def sum_data(month)
    records = user.records.where(published_at: monthly_range(month))
    [
      sum_charge(records.income),
      sum_charge(records.expenditure),
      records.inject(0) { |sum, record| sum + record.cashless_charge },
      records.inject(0) { |sum, record| sum + record.point }
    ]
  end

  def update_monthly(month)
    income_charge, expenditure_charge, cashless, point = sum_data(month)

    monthly = user.monthly_total_balance_tables.find_or_initialize_by(
      year: year, month: month, currency: user.profile.currency
    )
    monthly.update!(income: income_charge, expenditure: expenditure_charge,
                    cashless_charge: cashless, point: point)
  end
end
