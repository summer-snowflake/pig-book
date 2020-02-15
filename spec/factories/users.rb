# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
    password { 'password' }
    password_confirmation { password }
    authentication_token { SecureRandom.urlsafe_base64(24) }
    provider { 'email' }
    uid { email }
  end
end
