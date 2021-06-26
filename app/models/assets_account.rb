# frozen_string_literal: true

class AssetsAccount < ApplicationRecord
  include EnumDefinedCurrency
  include ActionView::Helpers::NumberHelper
  include ActionView::Helpers::DateHelper

  acts_as_list scope: :user_id, touch_on_update: false

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

  def human_charge
    yen? ? number_to_currency(money, unit: '¥', format: '%u%n') : number_to_currency(money, precision: 2)
  end

  def human_updated_at
    I18n.l(updated_at, format: :date)
  end

  def from_now
    time_ago_in_words(updated_at)
  end
end
