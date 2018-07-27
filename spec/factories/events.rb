# frozen_string_literal: true

FactoryBot.define do
  factory :event do
    user
    category { %i[monthly_calculator].sample }
  end
end
