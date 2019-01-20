# frozen_string_literal: true

FactoryBot.define do
  random = Random.new
  factory :yearly_balance_table do
    user
    year { Time.zone.now.year }
    balance_of_payments { false }
    charge { random.rand(0..10_000) }
    currency { :yen }
    other { false }

    trait :with_category do
      category
    end
    trait :income do
      balance_of_payments { true }
    end
  end
end
