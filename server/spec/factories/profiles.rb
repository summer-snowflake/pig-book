# frozen_string_literal: true

FactoryBot.define do
  factory :profile do
    user
    locale { :ja }
    currency { %i[yen dollar].sample }
    sequence(:memo) { |n| "メモ#{n}" }
  end
end
