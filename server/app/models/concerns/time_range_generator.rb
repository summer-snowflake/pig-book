# frozen_string_literal: true

module TimeRangeGenerator
  extend ActiveSupport::Concern

  # date があれば日ごと
  # year と month があれば月ごと
  # year のみであれば年ごと
  def time_range
    if date
      time_range_from_daily
    elsif year && month
      time_range_from_monthly
    elsif year
      time_range_from_yearly
    end
  end

  private

  def time_range_from_daily
    beginning = Time.zone.parse(Date.parse(@date).to_s)
    Range.new(beginning, beginning.end_of_day)
  end

  def time_range_from_monthly
    date = Date.new(year.to_i, month.to_i, 1).to_s
    beginning = Time.zone.parse(date).beginning_of_day
    Range.new(beginning, beginning.end_of_month.end_of_day)
  end

  def time_range_from_yearly
    new_year_day = Date.new(@year.to_i, 1, 1)
    beginning = Time.zone.parse(new_year_day.to_s).beginning_of_day
    Range.new(beginning, beginning.end_of_year.end_of_day)
  end
end
