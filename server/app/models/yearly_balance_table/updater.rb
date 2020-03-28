# frozen_string_literal: true

class YearlyBalanceTable::Updater
  include ActiveModel::Model

  attr_reader :user

  validates :year, numericality: { only_integer: true, greater_than: 0 }

  def initialize(user:)
    @user = user
  end

  def update
    user.dashboard_years.each do |year|
      update_yearly(year)
    end
  end

  private

  def update_yearly(year)
    yearly =
      user.yearly_total_balance_tables
          .find_or_initialize_by(year: year, currency: user.profile.currency)
    yearly.update!(sum_params(year))
  end

  def sum_params(year)
    monthly = user.monthly_balance_tables
                  .where(year: year, currency: user.profile.currency)
    {
      income: monthly.inject(0) { |sum, m| sum + m.income },
      expenditure: monthly.inject(0) { |sum, m| sum + m.expenditure },
      cashless_charge: monthly.inject(0) { |sum, m| sum + m.cashless_charge },
      point: monthly.inject(0) { |sum, m| sum + m.point }
    }
  end
end
