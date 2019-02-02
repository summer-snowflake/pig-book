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

    @records = @user.records
    @records = @records.where(published_at: @range) if @range
    @records = @records.where(category: @category) if @category
    @records.includes(:category, :place, :breakdown, tagged_records: :tag)
            .order("#{@order}": :desc, created_at: :desc).limit(@limit)
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
    @range = generate_range if @date || @year || @month
  end
end
