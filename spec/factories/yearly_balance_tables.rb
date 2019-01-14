# frozen_string_literal: true

FactoryBot.define do
  random = Random.new
  factory :yearly_balance_table do
    user
    year { Time.zone.now.year }
    income { random.rand(0..10_000) }
    expenditure { random.rand(0..10_000) }
    currency { :yen }

    trait :with_category do
      category
    end
  end
end
