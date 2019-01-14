# frozen_string_literal: true

class YearlyBalanceTable::Updater
  def initialize(user:)
    @user = user
  end

  def update!
    @user.present_years.each do |year|
      fetcher =
        MonthlyBalanceTable::Fetcher.new(user: @user, year: year)
      yearly = find_yearly(year)
      yearly.update!(
        income: fetcher.total_income,
        expenditure: fetcher.total_expenditure
      )
    end
  end

  private

  def find_yearly(year)
    YearlyBalanceTable.find_or_initialize_by(
      user: @user,
      year: year,
      currency: @user.base_setting.currency
    )
  end
end
