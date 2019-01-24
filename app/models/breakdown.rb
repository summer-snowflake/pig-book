# frozen_string_literal: true

class Breakdown < ApplicationRecord
  include ValidationErrorMessagesBuilder

  belongs_to :category
  has_many :records, dependent: :restrict_with_error
  has_many :templates
  has_many :yearly_breakdown_balance_tables, dependent: :restrict_with_error

  validates :name, presence: true, length: { maximum: 30 }
end
