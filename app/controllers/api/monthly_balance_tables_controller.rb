# frozen_string_literal: true

class Api::MonthlyBalanceTablesController < Api::BaseController
  def index
    date =
      params[:date] ? Time.parse(Date.parse(params[:date]).to_s) : nil
    monthly_balance_tables =
      MonthlyBalanceTable::Fetcher.all_of_year(user: current_user, date: date)
    render json: monthly_balance_tables
  end
end
