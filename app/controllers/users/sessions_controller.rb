# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  def create
    super(&:ensure_authentication_token)
  end

  def destroy
    users = Devise.mappings.keys.map do |scope|
      warden.user(scope: scope, run_callbacks: false)
    end
    users.each { |user| user.update(authentication_token: nil) }
    super
  end
end
