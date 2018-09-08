# frozen_string_literal: true

class MonthlyBalanceTable::Fetcher
  def initialize(user:)
    @user = user
  end

  def self.all_of_year(user:, date:)
    new(user: user).all_of_year(date: date)
  end

  def all_of_year(date:)
    @user.monthly_balance_tables
         .where(currency: @user.base_setting.currency)
         .where('beginning_at >= ? and beginning_at <= ?',
                date.beginning_of_year, date.end_of_year)
         .order(:beginning_at)
  end
end
