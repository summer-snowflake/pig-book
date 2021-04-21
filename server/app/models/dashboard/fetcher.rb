# frozen_string_literal: true

module Dashboard
  class Fetcher
    attr_reader :user

    def initialize(user:)
      @user = user
    end

    def all
      yearly_data = {}
      user.dashboard_years.each do |year|
        fetcher = Dashboard::YearlyFetcher.new(user: user, year: year)
        yearly_data[year] = fetcher.build_simple
      end
      yearly_data
    end

    def find_by(year:)
      fetcher = Dashboard::YearlyFetcher.new(user: user, year: year)
      fetcher.build
    end

    def find_by_category(year:, category_id:)
      category = user.categories.find(category_id)
      fetcher = Dashboard::YearlyCategoryFetcher.new(user: user, year: year, category: category)
      fetcher.build
    end
  end
end
