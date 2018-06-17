# frozen_string_literal: true

class Record::Fetcher
  include ActiveModel::Model

  attr_accessor :y, :m, :d

  validates :y, numericality: { allow_blank: true,
                                greater_than_or_equal_to: 1990,
                                less_than_or_equal_to: 2100 }
  validates :m, numericality: { allow_blank: true,
                                greater_than_or_equal_to: 1,
                                less_than_or_equal_to: 12 }
  validates :d, numericality: { allow_blank: true,
                                greater_than_or_equal_to: 1,
                                less_than_or_equal_to: 31 }

  def initialize(user:)
    @user = user
  end

  def find_all_by(params)
    @y = params[:y]
    @m = params[:m]
    @d = params[:d]

    @records = @user.records
    if generate_date_range
      @records = @records.where(published_on: generate_date_range)
    end
    @records.order(created_at: :desc)
  end

  private

  def generate_date_range
    if @d
      @y ||= Time.zone.today.year
      @m ||= Time.zone.today.month
      "#{@y}-#{@m}-#{@d}"
    elsif @m
      @y ||= Time.zone.today.year
      Date.new(@y, @m, 1)..Date.new(@y, @m, -1)
    elsif @y
      Date.new(@y, 1, 1)..Date.new(@y, 12, -1)
    end
  end
end
