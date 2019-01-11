# frozen_string_literal: true

class Api::MonthlyBalanceTablesController < Api::BaseController
  before_action :set_monthly_balance_table, only: %i[show total]

  # NOTE: データは、各年度ごとに取得するため、このメソッドでは年度のみを返す
  def index
    years = current_user.monthly_balance_tables
                        .where(currency: current_user.base_setting.currency)
                        .target_years
    render json: years
  end

  def show
    render json: @monthly_balance_table
  end

  def total
    total_of_year = {
      total_income: @monthly_balance_table.total_income,
      total_expenditure: @monthly_balance_table.total_expenditure
    }
    render json: total_of_year
  end

  private

  def set_monthly_balance_table
    year = params[:year].to_s
    @monthly_balance_table =
      MonthlyBalanceTable::Fetcher.all_of_year(user: current_user, year: year)
  end
end
