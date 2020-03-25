# frozen_string_literal: true

FactoryBot.define do
  random = Random.new

  factory :tally_event do
    user
    year { random.rand(2010..2030) }
  end
end
