# frozen_string_literal: true

class Category < ApplicationRecord
  belongs_to :user

  validates :balance_of_payments, inclusion: { in: [true, false] }
  validates :name, presence: true, length: { maximum: 30 },
                   uniqueness: { scope: %i[user balance_of_payments] }
end
