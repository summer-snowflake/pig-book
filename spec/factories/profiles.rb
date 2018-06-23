# frozen_string_literal: true

FactoryBot.define do
  factory :profile do
    user
    locale { %i[en ja].sample }
    currency { %i[yen dollar].sample }
  end
end
