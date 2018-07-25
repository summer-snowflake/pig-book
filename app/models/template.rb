# frozen_string_literal: true

class Template < ApplicationRecord
  belongs_to :category
  belongs_to :breakdown, optional: true

  validates :name, presence: true, length: { maximum: 250 }
  validates :charge, presence: true,
                     numericality: { greater_than_or_equal_to: 0 }
  validates :memo, length: { maximum: 250 }
end
