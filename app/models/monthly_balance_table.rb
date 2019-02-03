# frozen_string_literal: true

class MonthlyBalanceTable < ApplicationRecord
  include EnumDefinedCurrency

  belongs_to :user

  validates :year, :month, presence: true

  scope :target_years, lambda {
    this_year = Time.zone.today.year
    if present?
      [*(minimum(:year)..this_year)].reverse
    else
      [this_year]
    end
  }

  scope :the_year, lambda { |year|
    where(year: year).order(:month)
  }

  scope :total_income, lambda {
    return 0 if blank?

    sum(:income)
  }

  scope :total_expenditure, lambda {
    return 0 if blank?

    sum(:expenditure)
  }

  # NOTE: year と month は必須ではあるが、
  # new したものを返す場合にはデータがない場合があるため if で判定
  def year_and_month
    "#{year}-#{format('%02d', month)}" if year && month
  end

  def date
    Time.zone.local(year, month, 1) if year && month
  end
end
