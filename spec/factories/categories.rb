# frozen_string_literal: true

FactoryBot.define do
  factory :category do
    user
    sequence(:name) { |n| "カテゴリ名#{n}" }
    balance_of_payments false

    trait :income do
      balance_of_payments true
    end
  end
end
