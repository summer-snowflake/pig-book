# frozen_string_literal: true

class Category < ApplicationRecord
  MAX_NUMBER = 20

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
  validate :should_have_limited_count

  private

  def should_have_limited_count
    return unless user
    return if user.unlimited_option
    return if user.categories.count < MAX_NUMBER

    errors.add(:base, :is_limited)
  end
end
