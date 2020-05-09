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
      yearly_category_expenditure: yearly_category_expenditure(year)
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

  def yearly_category_expenditure(year)
    user.yearly_category_balance_tables
        .where(currency: user.profile.currency, year: year)
        .where.not(expenditure: 0)
        .order(expenditure: :desc)
  end
end
