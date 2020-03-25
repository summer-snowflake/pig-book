# frozen_string_literal: true

FactoryBot.define do
  factory :tally_event do
    user
    month { Time.zone.today.month }
  end
end
