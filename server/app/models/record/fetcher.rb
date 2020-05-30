# frozen_string_literal: true

class Record::Fetcher
  include ActiveModel::Model
  include TimeRangeGenerator

  attr_reader :user, :date, :year, :month, :page, :limit, :order
  attr_reader :category, :breakdown, :place, :records, :max_page, :totals

  validates :year, :month, :page, :limit,
            numericality: { only_integer: true, allow_blank: true }
  validates :order, inclusion: {
    in: %w[published_at created_at category_id breakdown_id place_id],
    allow_blank: true
  }

  PER_PAGE = 100

  def initialize(user:)
    @user = user
  end

  def find_all_by(params)
    init_attrs(params)
    return set_empty_attrs unless valid?

    records = search_records
    use_paginate(records.count)
    calculate_totals(records)

    records = records.offset(PER_PAGE * (page - 1)).limit(limit)
    records = records.order("#{order}": :desc) if order
    @records = records.order(created_at: :desc)
  rescue ActiveRecord::RecordNotFound
    set_empty_attrs
  end

  private

  def set_empty_attrs
    @records = Record.none
    @max_page = 1
    @totals = {
      human_income_charge: human_charge(0),
      human_expenditure_charge: human_charge(0),
      human_all_charge: human_charge(0),
      use_cashless_charge: 0,
      use_point: 0
    }
  end

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
      Time.zone.now
    else
      params[:date]&.in_time_zone('Tokyo')
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

  def use_paginate(records_count)
    @max_page = (records_count / PER_PAGE.to_f).ceil
  end

  def calculate_totals(records)
    income = records.income.sum(:charge)
    expenditure = records.expenditure.sum(:charge)
    @totals = {
      human_income_charge: human_charge(income),
      human_expenditure_charge: human_charge(expenditure),
      human_all_charge: human_charge(income - expenditure),
      use_cashless_charge: records.sum(:cashless_charge),
      use_point: records.sum(:point)
    }
  end

  def human_charge(charge)
    to_rounded = ActiveSupport::NumberHelper
                 .number_to_rounded(charge, strip_insignificant_zeros: true)
    integer_part, decimal_part = to_rounded.split('.')

    I18n.t('label.' + user.profile.currency) +
      " #{integer_part.to_i.to_s(:delimited)}#{decimal_part}"
  end
end
