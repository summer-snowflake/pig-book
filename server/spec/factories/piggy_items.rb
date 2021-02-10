# frozen_string_literal: true

FactoryBot.define do
  random = Random.new
  factory :piggy_item do
    user
    piggy_bank
    published_on { Time.zone.today }
    balance_of_payments { false }
    charge { random.rand(10..8000) }
    sequence(:name) { |n| "内容#{n}" }
  end
end
