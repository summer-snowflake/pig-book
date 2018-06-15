FactoryBot.define do
  factory :tag do
    user
    sequence(:name) { |n| "カテゴリ名#{n}" }
    color_code { '#' + format('%06x', (rand * 0xffffff)) }
  end
end
