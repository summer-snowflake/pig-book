# frozen_string_literal: true

class Category < ApplicationRecord
  include ValidationErrorMessagesBuilder

  belongs_to :user
  has_many :categorized_places, dependent: :destroy
  has_many :places, through: :categorized_places

  validates :balance_of_payments, inclusion: { in: [true, false] }
  validates :name, presence: true, length: { maximum: 30 }
end
