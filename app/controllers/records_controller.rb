# frozen_string_literal: true

class RecordsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_last_request_at, :set_authentication_token, :set_fetcher,
                only: %i[index new]

  def index
    month = Time.zone.today.to_s
    @records = @fetcher.find_all_by(month: month)
    @params = {
      month: month,
      records: @records,
      user_token: @access_token,
      last_request_at: @last_request_at
    }
  end

  def new
    @params = {
      records: @fetcher.find_all_by(date: Time.zone.today.to_s),
      recently_used: {
        recently_used_categories: current_user.recently_used_categories,
        recently_used_templates: current_user.recently_used_templates,
        recently_used_tags: current_user.recently_used_tags
      },
      user_token: @access_token,
      last_request_at: @last_request_at
    }
  end

  private

  def set_fetcher
    @fetcher = Record::Fetcher.new(user: current_user)
  end
end
