# frozen_string_literal: true

class Category < ApplicationRecord
  belongs_to :user, touch: true
  counter_culture :user
  has_many :breakdowns, dependent: :restrict_with_exception
  has_many :categorized_places, dependent: :destroy
  has_many :places, through: :categorized_places
  has_many :records, dependent: :restrict_with_exception
  has_many :monthly_category_balance_tables, dependent: :destroy
  has_many :monthly_breakdown_balance_tables, dependent: :destroy
  has_many :yearly_category_balance_tables, dependent: :destroy
  has_many :yearly_breakdown_balance_tables, dependent: :destroy

  validates :balance_of_payments, inclusion: { in: [true, false] }
  validates :name, presence: true, length: { maximum: 30 },
                   uniqueness: { scope: %i[user balance_of_payments] }
end
