# frozen_string_literal: true

FactoryBot.define do
  factory :yearly_record do
    user
    year { Time.zone.now.year }
    income { [*0..10_000].sample }
    expenditure { [*0..10_000].sample }
    currency { :yen }
    point { 0 }
    cashless_charge { 0 }
    type { 'YearlyTotalBalanceTable' }
    label { nil }

    factory :yearly_category_record, class: YearlyCategoryBalanceTable do
      type { 'YearlyCategoryBalanceTable' }
      category
    end
  end
end
