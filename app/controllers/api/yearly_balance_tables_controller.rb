# frozen_string_literal: true

class Api::YearlyBalanceTablesController < Api::BaseController
  before_action :set_yearly_balance_tables, only: %i[show category]

  def show
    totals = @yearly_balance_tables.totals(params[:year].to_i)

    render json: {
      income: to_serializers(totals.income),
      expenditure: to_serializers(totals.expenditure)
    }.to_json
  end

  def category
    totals = @yearly_balance_tables.category_totals(params[:year].to_i)

    render json: {
      income: to_serializers(totals.income),
      expenditure: to_serializers(totals.expenditure)
    }.to_json
  end

  private

  def set_yearly_balance_tables
    @yearly_balance_tables =
      current_user.yearly_balance_tables.where(currency: current_currency)
  end
end
