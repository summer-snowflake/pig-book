# frozen_string_literal: true

class Record < ApplicationRecord
  include EnumDefinedCurrency

  belongs_to :user
  belongs_to :category
  belongs_to :breakdown, optional: true
  belongs_to :place, optional: true

  validates :published_at, presence: true
  validates :currency, presence: true
  validates :charge,
            presence: true,
            numericality: { greater_than: 0 }
  validate :point_is_less_than_or_equal_to_charge
  validates :memo, length: { maximum: 250 }

  def point_is_less_than_or_equal_to_charge
    return unless charge && point
    return if point <= charge

    errors.add(:point, :less_than_or_equal_to, count: charge.to_i)
  end
end
