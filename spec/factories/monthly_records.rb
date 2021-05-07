# frozen_string_literal: true

FactoryBot.define do
  factory :monthly_record do
    user
    year { Time.zone.now.year }
    month { Time.zone.now.month }
    income { [*0..10_000].sample }
    expenditure { [*0..10_000].sample }
    currency { :yen }
    point { 0 }
    cashless_charge { 0 }
    type { 'MonthlyTotalBalanceTable' }

    factory :monthly_category_record, class: MonthlyCategoryBalanceTable do
      type { 'MonthlyCategoryBalanceTable' }
      category
      label { category.name }
    end

    factory :monthly_breakdown_record, class: MonthlyBreakdownBalanceTable do
      type { 'MonthlyBreakdownBalanceTable' }
      category
      breakdown
      label { breakdown.name }
    end
  end
end
