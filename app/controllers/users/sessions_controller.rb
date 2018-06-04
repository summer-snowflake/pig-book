# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController
  def create
    super do |resource|
      resource.generate_authentication_token
    end
  end
end
