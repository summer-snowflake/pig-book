# frozen_string_literal: true

class RecordsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_last_request_at, :set_authentication_token, :set_fetcher,
                only: %i[index new]

  # NOTE:
  # 年/月の指定が無い場合は「リスト」リンクからの今月へのアクセスとなる
  def index
    today = Time.zone.today
    year = params[:year] || today.year
    month = params[:month] || today.month
    @params = {
      year: year,
      month: month,
      records: @fetcher.find_all_by(year: year, month: month),
      user_token: @access_token, last_request_at: @last_request_at
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
