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
    yearly = find_yearly(year: year)
    yearly.update!(
      income: fetcher.total_income,
      expenditure: fetcher.total_expenditure
    )
  end

  def find_yearly(year:, category: nil)
    YearlyBalanceTable.find_or_initialize_by(
      user: @user,
      year: year,
      category: category,
      currency: @user.base_setting.currency
    )
  end
end
