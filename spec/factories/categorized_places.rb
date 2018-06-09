# frozen_string_literal: true

FactoryBot.define do
  factory :categorized_place do
    place
    category
  end
end
