# frozen_string_literal: true

FactoryBot.define do
  random = Random.new
  factory :monthly_balance_table do
    user
    year { Time.zone.now.year }
    month { Time.zone.now.month }
    income { random.rand(0..10_000) }
    expenditure { random.rand(0..10_000) }
  end
end
