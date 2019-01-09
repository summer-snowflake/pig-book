# frozen_string_literal: true

FactoryBot.define do
  random = Random.new
  factory :monthly_balance_table do
    user
    year_and_month { Time.zone.now.beginning_of_month.to_s.slice(0..6) }
    income { random.rand(0..10_000) }
    expenditure { random.rand(0..10_000) }
  end
end
