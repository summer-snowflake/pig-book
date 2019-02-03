# frozen_string_literal: true

class Record::Fetcher
  include ActiveModel::Model
  include TimeRangeGenerator

  attr_accessor :date

  def initialize(user:)
    @user = user
  end

  def find_all_by(params)
    init_params(params) && build_params(params)

    range = generate_range if @date || @year || @month
    @records = search_records
    @records = @records.where(published_at: range) if range
    @records.includes(:category, :place, :breakdown, tagged_records: :tag)
            .order("#{@order}": :desc, created_at: :desc).limit(@limit)
  end

  def totals
    MonthlyBalanceTable.new(
      user: @user,
      income: @records.income.sum(:charge),
      expenditure: @records.expenditure.sum(:charge),
      point: @records.sum(:point)
    )
  end

  private

  def init_params(params)
    @date = params[:date]
    @year = params[:year]
    @month = params[:month]
    @limit = params[:limit] || 100
    @order = params[:order] || :published_at
  end

  def build_params(params)
    category_id = params[:category_id]
    @category = @user.categories.find(category_id) if category_id
    breakdown_id = params[:breakdown_id]
    @breakdown = @user.breakdowns.find(breakdown_id) if breakdown_id
    @place = @user.places.find(params[:place_id]) if params[:place_id]
  end

  def search_records
    records = @user.records
    records = records.where(category: @category) if @category
    records = records.where(breakdown: @breakdown) if @breakdown
    records = records.where(place: @place) if @place
    records
  end
end
