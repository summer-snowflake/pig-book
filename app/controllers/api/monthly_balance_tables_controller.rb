# frozen_string_literal: true

class Api::MonthlyBalanceTablesController < Api::BaseController
  before_action :set_monthly_balance_table, only: %i[show]

  def show
    render json: @monthly_balance_table
  end

  private

  def set_monthly_balance_table
    date = Time.parse(Date.new(params[:year].to_i, 1, 1).to_s)
    @monthly_balance_table =
      MonthlyBalanceTable::Fetcher.all_of_year(user: current_user, date: date)
  end
end
