# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  def create
    super do |resource|
      resource.ensure_authentication_token
    end
  end

  def destroy
    users = Devise.mappings.keys.map { |s| warden.user(scope: s, run_callbacks: false) }
    users.each { |user| user.update(authentication_token: nil) }
    super
  end
end
