# frozen_string_literal: true

class PiggyBank < ApplicationRecord
  include EnumDefinedCurrency

  belongs_to :user
  has_many :piggy_items, -> { order(published_on: :asc) }, dependent: :restrict_with_exception

  MAX_NUMBER = 5
  TITLE_MAX_LENGTH = 30
  DESCRIPTION_MAX_LENGTH = 255

  validates :title, presence: true, length: { maximum: TITLE_MAX_LENGTH },
                    uniqueness: { scope: :user }
  validates :description, length: { maximum: DESCRIPTION_MAX_LENGTH }
  validate :should_have_limited_count

  private

  def should_have_limited_count
    return unless user
    return if user.unlimited_option
    return if user.piggy_banks.count < MAX_NUMBER

    errors.add(:base, :is_limited)
  end
end
