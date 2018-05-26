FactoryBot.define do
  factory :category do
    user
    sequence(:name) { |n| "カテゴリ名#{n}" }
    balance_of_payments false
  end
end
