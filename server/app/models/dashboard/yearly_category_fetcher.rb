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
      monthly_category: monthly_category
    }
  end

  private

  def monthly_category
    user.monthly_category_balance_tables
        .where(currency: user.profile.currency, year: year, category: category)
        .order(:month)
  end
end
