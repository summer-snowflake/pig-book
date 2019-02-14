# frozen_string_literal: true

FactoryBot.define do
  factory :import_history do
    user
    sequence(:row) { |n| "2014-03-22,医療費,診察代,歯医者,3400,#{n},医療費控除対象" }

    trait(:registered) do
      record
    end
  end
end
