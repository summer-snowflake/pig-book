# frozen_string_literal: true

class ImportHistoriesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_last_request_at, :set_authentication_token, only: %i[index]

  def index
    histories = current_user
                .import_histories
                .order(:created_at).limit(ImportHistory::DISPLAY_LIMIT_COUNT)
    @params = {
      histories: histories,
      user_token: @access_token,
      last_request_at: @last_request_at
    }
  end
end
