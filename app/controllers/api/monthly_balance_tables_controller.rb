# frozen_string_literal: true

class Api::MonthlyBalanceTablesController < Api::BaseController
  before_action :set_monthly_balance_table, only: %i[show]

  def index
    # NOTE: データは、各年度ごとに取得するため、このメソッドでは年度のみを返す
    target = current_user.monthly_balance_tables
                         .where(currency: current_user.base_setting.currency)
    oldest_year = target.minimum(:beginning_at)&.year
    range = oldest_year ? [*oldest_year..Time.zone.today.year] : [Time.zone.today.year]
    render json: range.reverse
  end

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
