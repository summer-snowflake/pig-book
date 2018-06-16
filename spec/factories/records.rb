# frozen_string_literal: true

FactoryBot.define do
  random = Random.new
  start_date = Date.parse('1923/08/07')
  finish_date = Date.parse('2020/02/12')
  factory :record do
    user
    category
    breakdown
    place
    published_on { Random.rand(start_date..finish_date) }
    charge { random.rand(10..8000) }
    sequence(:memo) { |n| "メモ#{n}" }
  end
end
