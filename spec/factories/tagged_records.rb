# frozen_string_literal: true

FactoryBot.define do
  factory :tagged_record do
    tag
    record
  end
end
