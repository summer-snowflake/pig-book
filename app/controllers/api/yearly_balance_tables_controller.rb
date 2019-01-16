# frozen_string_literal: true

class Api::YearlyBalanceTablesController < Api::BaseController
  before_action :set_yearly_balance_tables, only: %i[show]

  def show
    totals = @yearly_balance_tables.totals(params[:year].to_i)

    income = totals.find_or_initialize_by(balance_of_payments: true)
    expenditure = totals.find_or_initialize_by(balance_of_payments: false)
    json = {
      income: [YearlyBalanceTableSerializer.new(income)],
      expenditure: [YearlyBalanceTableSerializer.new(expenditure)]
    }.to_json
    render json: json
  end

  private

  def set_yearly_balance_tables
    @yearly_balance_tables =
      current_user.yearly_balance_tables.where(currency: current_currency)
  end
end
