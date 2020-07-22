# frozen_string_literal: true

class Dashboard::YearlyCategoryFetcher
  attr_reader :user, :year, :category

  def initialize(user:, year:, category:)
    @user = user
    @year = year
    @category = category
  end

  def build
    {
      monthly_breakdowns: monthly_breakdowns
    }
  end

  private

  def monthly_breakdowns
    monthly = []
    [*1..12].each do |month|
      monthly << user.monthly_breakdown_balance_tables
                     .where(currency: user.profile.currency, year: year, month: month, category: category)
                     .map { |b| [b.label, (category.balance_of_payments ? b.income : b.expenditure)] }
                     .to_h
                     .merge(month: month)
    end
    monthly
  end
end
