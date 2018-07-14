# frozen_string_literal: true

class Record < ApplicationRecord
  include ValidationErrorMessagesBuilder

  attr_accessor :tags
  before_save :set_tagged_records, if: 'tags.present?'

  belongs_to :user
  belongs_to :category
  belongs_to :breakdown, optional: true
  belongs_to :place, optional: true
  has_many :tagged_records

  validates :published_at, presence: true
  validates :charge, presence: true,
                     numericality: { greater_than_or_equal_to: 0 }
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
    if tag['color'].present?
      user.tags.find_by(color_code: tag['color']) ||
        user.tags.create(color_code: tag['color'], name: name)
    else
      color_code = '#' + format('%06x', (rand * 0xffffff))
      user.tags.create(color_code: color_code, name: name)
    end
  end
end
