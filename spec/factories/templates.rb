# frozen_string_literal: true

FactoryBot.define do
  random = Random.new
  factory :template do
    category
    sequence(:name) { |n| "テンプレート名#{n}" }
    charge { random.rand(10..8000) }
    breakdown
    sequence(:memo) { |n| "メモ#{n}" }
  end
end
