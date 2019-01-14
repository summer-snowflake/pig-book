# frozen_string_literal: true

class MonthlyBalanceTable::Fetcher
  def initialize(user:, year: Time.zone.today.year)
    @user = user
    @year = year
  end

  def self.all_of_year(user:, year:)
    new(user: user, year: year).all_of_year
  end

  def all_of_year
    @user.monthly_balance_tables
         .where(currency: @user.base_setting.currency)
         .the_year(@year)
  end

  def total_income
    all_of_year.total_income
  end

  def total_expenditure
    all_of_year.total_expenditure
  end
end
