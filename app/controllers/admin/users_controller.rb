# frozen_string_literal: true

class Admin::UsersController < Admin::BaseController
  before_action :set_last_request_at, :set_authentication_token, only: %i[index]

  def index
    @users = User.all
    @params = {
      user_token: @access_token,
      last_request_at: @last_request_at
    }
  end
end
