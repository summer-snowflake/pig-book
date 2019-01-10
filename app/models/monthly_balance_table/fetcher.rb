# frozen_string_literal: true

class MonthlyBalanceTable::Fetcher
  def initialize(user:)
    @user = user
  end

  def self.all_of_year(user:, year:)
    new(user: user).all_of_year(year: year)
  end

  def all_of_year(year:)
    @user.monthly_balance_tables
         .where(currency: @user.base_setting.currency)
         .the_year(year)
  end
end
