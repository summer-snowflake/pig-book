# frozen_string_literal: true

FactoryBot.define do
  random = Random.new

  factory :yearly_balance_table do
    user
    year { Time.zone.now.year }
    balance_of_payments { false }
    charge { random.rand(0..10_000) }
    currency { :yen }

    trait :income do
      balance_of_payments { true }
    end
  end

  factory :yearly_all_balance_table, \
          class: YearlyAllBalanceTable, parent: :yearly_balance_table do
    type { 1 }
    charge { 0 }
    income { random.rand(0..10_000) }
    expenditure { random.rand(0..10_000) }
  end

  factory :yearly_category_balance_table, \
          class: YearlyCategoryBalanceTable, parent: :yearly_balance_table do
    type { 2 }
    other { false }
    category
  end

  factory :yearly_breakdown_balance_table, \
          class: YearlyBreakdownBalanceTable, parent: :yearly_balance_table do
    type { 3 }
    other { false }
    category
    breakdown
  end
end
