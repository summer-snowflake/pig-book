# frozen_string_literal: true

class AssetsAccount < ApplicationRecord
  include EnumDefinedCurrency

  MAX_NUMBER = 10

  belongs_to :user, touch: true

  validates :name, presence: true, length: { maximum: 30 },
                   uniqueness: { scope: :user }
  validate :should_have_limited_count

  def should_have_limited_count
    return unless user
    return if user.unlimited_option
    return if user.assets_accounts.count < MAX_NUMBER

    errors.add(:base, :is_limited)
  end
end
