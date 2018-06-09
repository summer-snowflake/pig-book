FactoryBot.define do
  factory :breakdown do
    category
    sequence(:name) { |n| "内訳#{n}" }
  end
end
