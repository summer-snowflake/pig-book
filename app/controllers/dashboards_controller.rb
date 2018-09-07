# frozen_string_literal: true

class DashboardsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_last_request_at, :set_authentication_token, only: %i[show]

  def show
    monthly_balance_table =
      MonthlyBalanceTable::Fetcher.all_of_year(
        user: current_user, date: Time.zone.today
      )
    @params = {
      monthly_balance_table: monthly_balance_table,
      user_token: @access_token,
      last_request_at: @last_request_at
    }
  end
end
