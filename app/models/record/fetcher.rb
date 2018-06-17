# frozen_string_literal: true

class Record::Fetcher
  include ActiveModel::Model

  attr_accessor :date

  def initialize(user:)
    @user = user
  end

  def find_all_by(params)
    @date = params[:date]

    @records = @user.records
    if generate_date_range
      @records = @records.where(published_at: generate_date_range)
    end
    @records.order(created_at: :desc)
  end

  private

  def generate_date_range
    if @date
      begining_of_day = Time.parse("#{Date.parse(@date)}")
      begining_of_day..(begining_of_day + 1.day)
    end
  end
end
