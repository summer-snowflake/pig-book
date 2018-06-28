# frozen_string_literal: true

class Record < ApplicationRecord
  include ValidationErrorMessagesBuilder

  belongs_to :user
  belongs_to :category
  belongs_to :breakdown, optional: true
  belongs_to :place, optional: true

  validates :published_at, presence: true
  validates :charge, presence: true,
                     numericality: { greater_than_or_equal_to: 0 }
  validates :memo, length: { maximum: 250 }

  enum currency: { yen: 0, dollar: 1 }
end
