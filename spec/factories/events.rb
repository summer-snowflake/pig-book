# frozen_string_literal: true

FactoryBot.define do
  factory :event do
    user
    created_by { user.id }
    category { %i[monthly_calculator].sample }
  end
end
