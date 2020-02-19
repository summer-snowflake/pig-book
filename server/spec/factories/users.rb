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
  end
end
