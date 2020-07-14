# frozen_string_literal: true

class Breakdown < ApplicationRecord
  MAX_NUMBER = 20

  belongs_to :user, touch: true
  counter_culture :user
  belongs_to :category
  has_many :records, dependent: :restrict_with_exception
  has_many :monthly_breakdown_balance_tables, dependent: :destroy
  has_many :yearly_breakdown_balance_tables, dependent: :destroy

  validates :name, presence: true, length: { maximum: 30 },
                   uniqueness: { scope: %i[user category] }
  validate :should_have_limited_count

  private

  def should_have_limited_count
    return unless user
    return if user.unlimited_option
    return if user.breakdowns.count < MAX_NUMBER

    errors.add(:base, :is_limited)
  end
end
