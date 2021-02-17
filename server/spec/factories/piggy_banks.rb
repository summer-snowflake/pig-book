# frozen_string_literal: true

FactoryBot.define do
  factory :piggy_bank do
    user
    sequence(:title) { |n| "タイトル#{n}" }
    sequence(:description) { |n| "説明#{n}" }
    currency { :yen }
  end
end
