# frozen_string_literal: true

class Dashboard::Fetcher
  attr_reader :user

  def initialize(user:)
    @user = user
  end

  def all
    yearly_data = {}
    user.dashboard_years.each do |year|
      yearly_data[year] = find_by(year: year)
    end
    yearly_data
  end

  def find_by(year:)
    {
      year: year,
      event: user.tally_events.where(year: year).last,
      monthly: monthly_total(year),
      yearly: yearly_total(year),
      yearly_category_income: yearly_category_income(year),
      yearly_category_expenditure: yearly_category_expenditure(year),
      yearly_breakdown_income: yearly_breakdown_income(year),
      yearly_breakdown_expenditure: yearly_breakdown_expenditure(year)
    }
  end

  private

  def monthly_total(year)
    user.monthly_total_balance_tables
        .where(currency: user.profile.currency, year: year)
        .order(:month)
  end

  def yearly_total(year)
    user.yearly_total_balance_tables
        .where(currency: user.profile.currency, year: year).first
  end

  def yearly_category_income(year)
    user.yearly_category_balance_tables
        .where(currency: user.profile.currency, year: year)
        .where.not(income: 0)
        .order(income: :desc)
  end

  def yearly_breakdown_income(year)
    breakdown_income = []
    yearly_category_income(year)
      .group_by(&:category_id).each do |category_id, _records|
      breakdown_income << user.yearly_breakdown_balance_tables
                              .where(currency: user.profile.currency,
                                     year: year, category_id: category_id)
                              .order(income: :desc)
    end
    breakdown_income.flatten
  end

  def yearly_category_expenditure(year)
    user.yearly_category_balance_tables
        .where(currency: user.profile.currency, year: year)
        .where.not(expenditure: 0)
        .order(expenditure: :desc)
  end

  def yearly_breakdown_expenditure(year)
    breakdown_expenditure = []
    yearly_category_expenditure(year)
      .group_by(&:category_id).each do |category_id, _records|
      breakdown_expenditure << user.yearly_breakdown_balance_tables
                                   .where(currency: user.profile.currency,
                                          year: year, category_id: category_id)
                                   .order(expenditure: :desc)
    end
    breakdown_expenditure.flatten
  end
end
