# frozen_string_literal: true

FactoryBot.define do
  factory :event do
    user
    category { :tally }
    operator { user }
  end
end
