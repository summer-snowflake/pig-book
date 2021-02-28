# frozen_string_literal: true

class PiggyItem < ApplicationRecord
  belongs_to :piggy_bank

  MAX_NUMBER = 15
  NAME_MAX_LENGTH = 255

  validates :charge, presence: true
  validates :name, presence: true, length: { maximum: NAME_MAX_LENGTH }
  validate :should_have_limited_count

  private

  def should_have_limited_count
    return unless piggy_bank&.user
    return if piggy_bank.user.unlimited_option
    return if piggy_bank.piggy_items.count < MAX_NUMBER

    errors.add(:base, :is_limited)
  end
end
