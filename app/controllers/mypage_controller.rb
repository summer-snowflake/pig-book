# frozen_string_literal: true

class MypageController < ApplicationController
  before_action :authenticate_user!
  before_action :set_last_request_at, :set_authentication_token, only: %i[show]

  def show
    @params = {
      memo: current_user.profile.memo,
      user_token: @access_token,
      last_request_at: @last_request_at
    }
  end
end
