# frozen_string_literal: true

class PiggyItemsController < BaseController
  before_action :find_piggy_bank, only: :index

  def index
    render json: @piggy_bank.piggy_items, status: :ok
  end

  private

  def find_piggy_bank
    @piggy_bank = current_user.piggy_banks.find(params[:piggy_bank_id])
  end
end
