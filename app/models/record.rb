# frozen_string_literal: true

class Record < ApplicationRecord
  include ValidationErrorMessagesBuilder
  include EnumDefinedCurrency

  attr_accessor :tags
  before_save :set_tagged_records, if: -> { tags.present? }

  belongs_to :user
  belongs_to :category
  belongs_to :breakdown, optional: true
  belongs_to :place, optional: true
  has_one :import_history, dependent: :destroy
  has_many :tagged_records, dependent: :destroy

  validates :published_at, presence: true
  validates :charge,
            presence: true,
            numericality: { greater_than_or_equal_to: 0, allow_nil: true }
  validate :point_is_less_than_or_equal_to_charge
  validates :memo, length: { maximum: 250 }

  scope :current_currency,
        ->(user) { where(currency: user.base_setting.currency) }

  scope :the_year, lambda { |year|
    time = Time.zone.local(year, 1, 1)
    where('published_at > ? and published_at < ?',
          time.beginning_of_year, time.end_of_year)
  }

  class << self
    def income
      eager_load(:category).where(categories: { balance_of_payments: true })
    end

    def expenditure
      eager_load(:category).where(categories: { balance_of_payments: false })
    end
  end

  def year_and_month
    published_at.to_s.slice(0..6)
  end

  def published_date
    Date.parse(published_at.to_s)
  end

  def category_name
    category.name
  end

  def breakdown_name
    breakdown&.name
  end

  def place_name
    place&.name
  end

  def tag_names
    tagged_records.map { |tagged| tagged.tag.name }
  end

  private

  def set_tagged_records
    tagged_records.destroy_all
    # NOTE: サーバー側で処理した場合、JSON.parseが不要なため
    hash_tags = tags.is_a?(Hash) ? tags : JSON.parse(tags)
    hash_tags.values.each do |tag|
      new_tag = find_tag(tag)
      tagged_records.new(tag: new_tag)
    end
  end

  def find_tag(tag)
    name = tag['name']
    if tag['color_code'].present?
      user.tags.find_by(color_code: tag['color_code']) ||
        user.tags.create(color_code: tag['color_code'], name: name)
    else
      user.tags.create(color_code: generate_color_code, name: name)
    end
  end

  def generate_color_code
    color_code = '#' + format('%06x', (rand * 0xffffff))
    return color_code if user.tags.find_by(color_code: color_code).nil?

    generate_color_code
  end

  def point_is_less_than_or_equal_to_charge
    return unless charge && point
    return if point <= charge

    errors[:point] <<
      I18n.t('messages.errors.point.less_than_or_equal_to', count: charge)
  end
end
