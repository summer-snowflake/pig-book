# frozen_string_literal: true

class BreakdownsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_last_request_at, :set_authentication_token, only: %i[index]

  def index
    @breakdowns = current_user.breakdowns
    @params = {
      breakdowns: @breakdowns,
      user_token: @access_token,
      last_request_at: @last_request_at
    }
  end
end
