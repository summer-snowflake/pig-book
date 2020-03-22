# frozen_string_literal: true

class Record::Fetcher
  include ActiveModel::Model

  attr_reader :user, :date, :year, :month, :page, :limit, :order
  attr_reader :category, :breakdown, :place
  attr_reader :records, :max_page

  PER_PAGE = 5

  def initialize(user:)
    @user = user
  end

  def find_all_by(params)
    init_attrs(params)

    records = search_records
    @max_page = (records.count / PER_PAGE.to_f).ceil
    records = records.offset(PER_PAGE * (page - 1))
    records = records.limit(limit)
    records = records.order("#{order}": :desc) if order
    @records = records.order(created_at: :desc)
  end

  private

  def search_records
    records = user.records.where(published_at: time_range)
    records = records.where(category: category) if category
    records = records.where(breakdown: breakdown) if breakdown
    records = records.where(place: place) if place
    records = records.includes(:category, :breakdown, :place)
    records
  end

  def init_attrs(params)
    @year = params[:year]
    @month = params[:month]
    @date = get_date(params)
    @limit = params[:limit] || PER_PAGE
    @page = (params[:page] || 1).to_i
    @order = params[:order]

    @category = find_category(params[:category_id])
    @breakdown = find_breakdown(params[:breakdown_id])
    @place = find_place(params[:place_id])
  end

  def get_date(params)
    if params[:year].blank? && params[:month].blank? && params[:date].blank?
      Time.zone.today.to_s
    else
      params[:date]
    end
  end

  def find_category(category_id)
    return unless category_id

    user.categories.find(category_id)
  end

  def find_breakdown(breakdown_id)
    return unless breakdown_id

    user.breakdowns.find(breakdown_id)
  end

  def find_place(place_id)
    return unless place_id

    user.places.find(place_id)
  end

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
