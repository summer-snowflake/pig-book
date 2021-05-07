# frozen_string_literal: true

FactoryBot.define do
  factory :categorized_place do
    category
    place
  end
end
