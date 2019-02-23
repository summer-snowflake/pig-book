# frozen_string_literal: true

class Api::YearlyBalanceTablesController < Api::BaseController
  before_action :set_yearly_balance_tables, only: %i[index]
  before_action :set_yearly_all_balance_tables, only: %i[show]
  before_action :set_yearly_category_balance_tables,
                only: %i[category]
  before_action :set_yearly_breakdown_balance_tables, only: %i[category]

  def index
    render json: @yearly_balance_tables
  end

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
    render json: {
      category: {
        income: to_serializers(@category_totals_income.with_other),
        expenditure: to_serializers(@category_totals_expenditure.with_other)
      },
      breakdown: {
        income: to_serializers(@breakdown_totals_income),
        expenditure: to_serializers(@breakdown_totals_expenditure)
      }
    }.to_json
  end

  private

  def set_yearly_balance_tables
    @yearly_balance_tables =
      YearlyAllBalanceTable::Fetcher.all(user: current_user)
  end

  def set_yearly_all_balance_tables
    @totals = current_user
              .yearly_all_balance_tables
              .where(currency: current_currency)
              .where(year: params[:year].to_i)
  end

  def set_yearly_category_balance_tables
    category_totals =
      current_user
      .yearly_category_balance_tables
      .where(currency: current_currency)
      .where(year: params[:year].to_i)
      .order(charge: :desc)
    @category_totals_income = category_totals.income
    @category_totals_expenditure = category_totals.expenditure
  end

  def set_yearly_breakdown_balance_tables
    breakdown_totals =
      current_user
      .yearly_breakdown_balance_tables
      .where(currency: current_currency)
      .where(year: params[:year].to_i)
      .order(charge: :desc)
    @breakdown_totals_income =
      breakdown_totals.income.sort_category(@category_totals_income)
    @breakdown_totals_expenditure =
      breakdown_totals.expenditure.sort_category(@category_totals_expenditure)
  end
end
