# frozen_string_literal: true

class Api::MonthlyBalanceTablesController < Api::BaseController
  def index
    monthly_balance_tables =
      MonthlyBalanceTable::Fetcher.all(user: current_user)
    render json: monthly_balance_tables
  end
end
