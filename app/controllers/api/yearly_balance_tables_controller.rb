# frozen_string_literal: true

class Api::YearlyBalanceTablesController < Api::BaseController
  before_action :set_yearly_all_balance_tables, only: %i[show]
  before_action :set_yearly_category_balance_tables,
                only: %i[category breakdown]
  before_action :set_yearly_breakdown_balance_tables, only: %i[breakdown]

  def show
    render json: {
      totals: {
        income: to_serializers(@totals.income).first ||
                to_serializers(@totals.new),
        expenditure: to_serializers(@totals.expenditure).first ||
                     to_serializers(@totals.new)
      }
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

  def breakdown
    category_totals = @yearly_category_balance_tables
                      .where(year: params[:year].to_i).order(charge: :desc)

    totals = @yearly_breakdown_balance_tables.where(year: params[:year].to_i)
    income_totals = totals.income.sort_category(category_totals.income)
    expenditure_totals =
      totals.expenditure.sort_category(category_totals.expenditure)

    render json: {
      income: to_serializers(income_totals),
      expenditure: to_serializers(expenditure_totals)
    }.to_json
  end

  private

  def set_yearly_all_balance_tables
    @totals = current_user
              .yearly_all_balance_tables
              .where(currency: current_currency)
              .where(year: params[:year].to_i)
  end

  def set_yearly_category_balance_tables
    @yearly_category_balance_tables =
      current_user.yearly_category_balance_tables
                  .where(currency: current_currency)
  end

  def set_yearly_breakdown_balance_tables
    @yearly_breakdown_balance_tables =
      current_user.yearly_breakdown_balance_tables
                  .where(currency: current_currency)
  end
end
