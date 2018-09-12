# frozen_string_literal: true

class ImportHistoriesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_last_request_at, :set_authentication_token, only: %i[index]
  before_action :set_histories, only: %i[index]

  def index
    @params = {
      histories: @histories,
      user_token: @access_token,
      last_request_at: @last_request_at
    }
  end
end
