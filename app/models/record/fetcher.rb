# frozen_string_literal: true

class Record::Fetcher
  include ActiveModel::Model

  attr_accessor :date

  def initialize(user:)
    @user = user
  end

  def find_all_by(params)
    build_params(params)

    @records = @user.records
    @records = @records.where(published_at: generate_range) if @date || @month
    @records.includes(:category, :place, :breakdown)
            .order("#{@order}": :desc).limit(@limit)
  end

  private

  def build_params(params)
    @date = params[:date]
    @month = params[:month]
    @limit = params[:limit] || 100
    @order = params[:order] || :published_at
  end

  def generate_range
    if @date
      generate_date_range
    elsif @month
      generate_month_range
    end
  end

  def generate_date_range
    beginning = Time.parse(Date.parse(@date).to_s)
    beginning..beginning.end_of_day
  end

  def generate_month_range
    beginning_date = Date.parse(@month).beginning_of_month
    end_date = beginning_date.end_of_month
    Time.parse(beginning_date.to_s)..Time.parse(end_date.to_s)
  end
end
