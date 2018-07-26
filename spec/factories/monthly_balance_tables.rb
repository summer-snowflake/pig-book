# frozen_string_literal: true

FactoryBot.define do
  random = Random.new
  factory :monthly_balance_table do
    user
    year { random.rand(1990..2020) }
    month { random.rand(1..12) }
    income { random.rand(0..10_000) }
    expenditure { random.rand(0..10_000) }
  end
end
