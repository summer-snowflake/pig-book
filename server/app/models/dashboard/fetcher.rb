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
      event: user.tally_events.where(year: year).last,
      monthly: user.monthly_balance_tables
                   .where(currency: user.profile.currency, year: year),
      yearly: user.yearly_total_balance_tables
                  .where(currency: user.profile.currency, year: year).first
    }
  end
end
