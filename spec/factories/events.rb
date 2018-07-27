# frozen_string_literal: true

FactoryBot.define do
  factory :event do
    user
    created_by { user.id }
    category { %i[tally_monthly].sample }
  end
end
