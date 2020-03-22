# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
    password { 'password' }
    password_confirmation { password }
    provider { 'email' }
    uid { email }

    trait :active do
      confirmed_at { Time.zone.now }
    end

    trait :admin do
      after(:create) do |user|
        create(:admin, user: user)
      end
    end

    trait :with_profile do
      after(:create) do |user|
        create(:profile, user: user, currency: :yen)
      end
    end
  end
end
