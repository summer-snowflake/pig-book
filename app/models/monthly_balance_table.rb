# frozen_string_literal: true

class MonthlyBalanceTable < ApplicationRecord
  include EnumDefinedCurrency

  belongs_to :user

  scope :target_years, lambda {
    this_year = Time.zone.today.year
    if present?
      oldest_year = minimum(:year_and_month).slice(0..3).to_i
      [*(oldest_year..this_year)].reverse
    else
      [this_year]
    end
  }

  scope :the_year, lambda { |year|
    where("year_and_month like '" + year.to_s + "-%'").sort
  }
end
