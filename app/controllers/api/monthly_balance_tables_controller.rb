# frozen_string_literal: true

class Api::MonthlyBalanceTablesController < Api::BaseController
  before_action :set_monthly_balance_tables, only: %i[show]

  # NOTE: データは、各年度ごとに取得するため、このメソッドでは年度のみを返す
  def index
    years = current_user.monthly_balance_tables
                        .where(currency: current_user.base_setting.currency)
                        .target_years
    render json: years
  end

  def show
    render json: @monthly_balance_tables
  end

  def total
    yearly_balance_table = current_user.yearly_balance_tables.find_or_initialize_by(year: params[:year].to_i, currency: current_user.base_setting.currency)
    render json: yearly_balance_table
  end

  private

  def set_monthly_balance_tables
    year = params[:year].to_s
    @monthly_balance_tables =
      MonthlyBalanceTable::Fetcher.all_of_year(user: current_user, year: year)
  end
end
