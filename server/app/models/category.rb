# frozen_string_literal: true

class Category < ApplicationRecord
  belongs_to :user
  counter_culture :user
  has_many :breakdowns, dependent: :restrict_with_exception
  has_many :categorized_places, dependent: :destroy
  has_many :places, through: :categorized_places
  has_many :records, dependent: :restrict_with_exception

  validates :balance_of_payments, inclusion: { in: [true, false] }
  validates :name, presence: true, length: { maximum: 30 },
                   uniqueness: { scope: %i[user balance_of_payments] }
end
