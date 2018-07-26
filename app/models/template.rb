# frozen_string_literal: true

class Template < ApplicationRecord
  include ValidationErrorMessagesBuilder

  belongs_to :category
  belongs_to :breakdown, optional: true
  belongs_to :tag, optional: true

  validates :name, presence: true, length: { maximum: 250 }
  validates :charge,
            presence: true,
            numericality: { greater_than_or_equal_to: 0, allow_nil: true }
  validates :memo, length: { maximum: 250 }
end
