# frozen_string_literal: true

class RecordsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_last_request_at, :set_authentication_token, only: %i[new]

  def new
    @params = {
      user_token: @access_token,
      last_request_at: @last_request_at
    }
  end
end
