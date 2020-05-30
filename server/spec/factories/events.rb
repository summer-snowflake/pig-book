# frozen_string_literal: true

FactoryBot.define do
  factory :tally_event do
    user
    year { [*1..12].sample }
  end
end
