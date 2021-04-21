# frozen_string_literal: true

module Dashboard
  class YearlyCategoryFetcher
    attr_reader :user, :year, :category

    def initialize(user:, year:, category:)
      @user = user
      @year = year
      @category = category
    end

    def build
      {
        monthly_breakdowns: monthly_breakdowns,
        breakdowns: dashboard_breakdowns
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

    def dashboard_breakdowns
      breakdown_ids = user.yearly_breakdown_balance_tables
                          .where(currency: user.profile.currency, year: year).pluck(:breakdown_id)
      user.breakdowns.where(id: breakdown_ids, category_id: category.id)
    end
  end
end
