# frozen_string_literal: true

class Category < ApplicationRecord
  include ValidationErrorMessagesBuilder

  belongs_to :user
  has_many :categorized_places, dependent: :destroy
  has_many :places, through: :categorized_places
  has_many :breakdowns, dependent: :destroy
  has_many :records, dependent: :restrict_with_error
  has_many :templates, dependent: :restrict_with_error
  has_many :yearly_balance_tables, dependent: :restrict_with_error

  validates :balance_of_payments, inclusion: { in: [true, false] }
  validates :name, presence: true, length: { maximum: 30 },
                   uniqueness: { scope: :user }
end
