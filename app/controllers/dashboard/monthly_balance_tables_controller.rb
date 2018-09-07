# frozen_string_literal: true

class Dashboard::MonthlyBalanceTablesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_last_request_at, :set_authentication_token, only: %i[index]

  def index
    target = current_user.monthly_balance_tables
                         .where(currency: current_user.base_setting.currency)
    oldest_year = target.minimum(:beginning_at)&.year
    range = oldest_year ? [*oldest_year..Time.zone.today.year] : [Time.zone.today.year]
    @years = range.reverse
    @params = {
      user_token: @access_token,
      last_request_at: @last_request_at
    }
  end
end
