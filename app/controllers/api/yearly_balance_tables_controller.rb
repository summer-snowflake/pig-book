# frozen_string_literal: true

class Api::YearlyBalanceTablesController < Api::BaseController
  before_action :set_yearly_balance_tables, only: %i[show]

  def show
    render json: @yearly_balance_table
  end

  private

  def set_yearly_balance_tables
    @yearly_balance_table =
      current_user
      .yearly_balance_tables
      .find_or_initialize_by(
        year: params[:year].to_s,
        currency: current_currency
      )
  end
end
