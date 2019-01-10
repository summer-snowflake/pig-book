# frozen_string_literal: true

module TimeRangeGenerator
  extend ActiveSupport::Concern

  def generate_range
    if @date
      generate_date_range
    elsif @year && @month
      generate_month_range
    elsif @year
      generate_year_range
    end
  end

  private

  def generate_date_range
    beginning = Time.parse(Date.parse(@date).to_s)
    beginning..beginning.end_of_day
  end

  def generate_month_range
    date = Date.new(@year.to_i, @month.to_i, 1).to_s
    beginning = Time.parse(date).beginning_of_day
    beginning..beginning.end_of_month.end_of_day
  end

  def generate_year_range
    beginning = Time.parse(Date.new(@year.to_i, 1, 1).to_s).beginning_of_day
    beginning..beginning.end_of_year.end_of_day
  end
end
