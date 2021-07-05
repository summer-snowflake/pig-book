# frozen_string_literal: true

FactoryBot.define do
  random = Random.new
  factory :assets_account do
    user
    balance_of_payments { true }
    sequence(:name) { |n| "#{n}銀行" }
    money { random.rand(10..10_000) }
    checked { true }
  end
end
