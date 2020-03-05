# frozen_string_literal: true

FactoryBot.define do
  factory :breakdown do
    user
    category
    sequence(:name) { |n| "内訳#{n}" }
  end
end
