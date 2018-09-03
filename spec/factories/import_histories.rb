# frozen_string_literal: true

FactoryBot.define do
  factory :import_history do
    user
    sequence(:row) { |n| "2018-03-03, CSVデータ#{n}" }
  end
end
