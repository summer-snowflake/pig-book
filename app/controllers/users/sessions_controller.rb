# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  def create
    super(&:ensure_authentication_token)
  end

  def destroy
    current_user.update(authentication_token: nil)
    super
  end
end
