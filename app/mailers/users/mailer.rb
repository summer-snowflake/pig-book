# frozen_string_literal: true

class Users::Mailer < Devise::Mailer
  default from: ENV['SENDER_EMAIL_ADDRESS']
end
