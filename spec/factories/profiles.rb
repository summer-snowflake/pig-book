FactoryBot.define do
  factory :profile do
    user
    locale { %i[en ja].sample }
  end
end
