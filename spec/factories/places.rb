# frozen_string_literal: true

FactoryBot.define do
  factory :place do
    user
    sequence(:name) { |n| "場所#{n}" }
  end
end
