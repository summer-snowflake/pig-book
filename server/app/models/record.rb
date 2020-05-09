# frozen_string_literal: true

class Record < ApplicationRecord
  include EnumDefinedCurrency

  belongs_to :user
  counter_culture :user
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

  class << self
    def income
      eager_load(:category).where(categories: { balance_of_payments: true })
                           .current_currency
    end

    def expenditure
      eager_load(:category).where(categories: { balance_of_payments: false })
                           .current_currency
    end

    def current_currency
      return Record.none if last.nil?

      where(currency: last.user.profile.currency)
    end
  end

  def point_is_less_than_or_equal_to_charge
    return unless charge && point
    return if point <= charge

    errors.add(:point, :less_than_or_equal_to, count: charge.to_i)
  end

  def human_charge
    integer_part, decimal_part = number_to_rounded.split('.')

    I18n.t('label.' + currency) +
      " #{integer_part.to_i.to_s(:delimited)}#{decimal_part}"
  end

  def rounded_charge
    number_to_rounded
  end

  private

  def number_to_rounded
    ActiveSupport::NumberHelper
      .number_to_rounded(charge, strip_insignificant_zeros: true)
  end
end