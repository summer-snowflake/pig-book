# frozen_string_literal: true

class YearlyCategoryBalanceTable < YearlyRecord
  belongs_to :category

  MAX_CATEGORY_NUMBER = 6

  scope :with_other, lambda {
    offset_records = offset(MAX_CATEGORY_NUMBER)
    return limit(MAX_CATEGORY_NUMBER) if offset_records.count.zero?

    limit(MAX_CATEGORY_NUMBER) +
      [build(
        user_id: last.user,
        category_id: nil,
        label: I18n.t('label.other'),
        year: last.year,
        currency: last.currency,
        income: offset_records.pluck(:income).sum,
        expenditure: offset_records.pluck(:expenditure).sum,
        cashless_charge: offset_records.pluck(:cashless_charge).sum,
        point: offset_records.pluck(:point).sum
      )]
  }
end
