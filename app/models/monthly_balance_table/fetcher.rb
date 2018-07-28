# frozen_string_literal: true

class MonthlyBalanceTable::Fetcher
  def initialize(user:, date:)
    @user = user
    @date = date
  end

  def self.all(user:, date: Time.zone.today)
    new(user: user, date: date).all
  end

  def all
    @user.monthly_balance_tables
         .where(currency: @user.base_setting.currency)
         .where('beginning_at >= ? and beginning_at <= ?',
                @date.beginning_of_year, @date.end_of_year)
         .order(:beginning_at)
  end
end
