# frozen_string_literal: true

class Api::YearlyBalanceTablesController < Api::BaseController
  before_action :set_yearly_all_balance_tables, only: %i[show]
  before_action :set_yearly_category_balance_tables, only: %i[category]

  def show
    totals = @yearly_all_balance_tables.where(year: params[:year].to_i)

    render json: {
      income: to_serializers(totals.income),
      expenditure: to_serializers(totals.expenditure)
    }.to_json
  end

  def category
    totals = @yearly_category_balance_tables
             .where(year: params[:year].to_i).order(charge: :desc)

    render json: {
      income: to_serializers(totals.income.with_other),
      expenditure: to_serializers(totals.expenditure.with_other)
    }.to_json
  end

  private

  def set_yearly_all_balance_tables
    @yearly_all_balance_tables =
      current_user.yearly_all_balance_tables.where(currency: current_currency)
  end

  def set_yearly_category_balance_tables
    @yearly_category_balance_tables =
      current_user.yearly_category_balance_tables
                  .where(currency: current_currency)
  end
end
