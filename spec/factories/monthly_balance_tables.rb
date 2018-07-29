# frozen_string_literal: true

FactoryBot.define do
  random = Random.new
  factory :monthly_balance_table do
    user
    beginning_at { Time.zone.now.beginning_of_month }
    income { random.rand(0..10_000) }
    expenditure { random.rand(0..10_000) }
  end
end
