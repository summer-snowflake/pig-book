# frozen_string_literal: true

FactoryBot.define do
  factory :tag do
    user
    sequence(:name) { |n| "ラベル名#{n}" }
    color_code { "##{format('%<color>06x', color: (rand * 0xffffff))}" }
  end
end
