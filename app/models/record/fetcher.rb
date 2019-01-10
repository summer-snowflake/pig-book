# frozen_string_literal: true

class Record::Fetcher
  include ActiveModel::Model
  include TimeRangeGenerator

  attr_accessor :date

  def initialize(user:)
    @user = user
  end

  def find_all_by(params)
    build_params(params)

    @records = @user.records
    @records = @records.where(published_at: @range) if @range
    @records.includes(:category, :place, :breakdown, tagged_records: :tag)
            .order("#{@order}": :desc, created_at: :desc).limit(@limit)
  end

  private

  def build_params(params)
    @date = params[:date]
    @year = params[:year]
    @month = params[:month]
    @range = generate_range if @date || @year || @month
    @limit = params[:limit] || 100
    @order = params[:order] || :published_at
  end
end
