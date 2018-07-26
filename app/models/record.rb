# frozen_string_literal: true

class Record < ApplicationRecord
  include ValidationErrorMessagesBuilder

  attr_accessor :tags
  before_save :set_tagged_records, if: -> { tags.present? }

  belongs_to :user
  belongs_to :category
  belongs_to :breakdown, optional: true
  belongs_to :place, optional: true
  has_many :tagged_records

  validates :published_at, presence: true
  validates :charge,
            presence: true,
            numericality: { greater_than_or_equal_to: 0, allow_nil: true }
  validate :point_is_less_than_or_equal_to_charge
  validates :memo, length: { maximum: 250 }

  enum currency: { yen: 0, dollar: 1 }

  private

  def set_tagged_records
    tagged_records.destroy_all
    JSON.parse(tags).values.each do |tag|
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
      color_code = '#' + format('%06x', (rand * 0xffffff))
      user.tags.create(color_code: color_code, name: name)
    end
  end

  def point_is_less_than_or_equal_to_charge
    return unless charge && point
    return if point <= charge

    errors[:point] <<
      I18n.t('messages.errors.point.less_than_or_equal_to', count: charge)
  end
end
