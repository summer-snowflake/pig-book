# frozen_string_literal: true

class Category < ApplicationRecord
  include ValidationErrorMessagesBuilder

  belongs_to :user

  validates :balance_of_payments, inclusion: { in: [true, false] }
  validates :name, presence: true, length: { maximum: 30 }
end
