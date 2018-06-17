# frozen_string_literal: true

class RecordsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_last_request_at, :set_authentication_token, only: %i[new]

  def new
    fetcher = Record::Fetcher.new(user: current_user)
    @records = fetcher.find_all_by(d: Time.zone.today.day)
    @params = {
      records: @records,
      user_token: @access_token,
      last_request_at: @last_request_at
    }
  end
end
