# frozen_string_literal: true

class PiggyItemsController < BaseController
  before_action :find_piggy_bank, only: %i[index create]

  def index
    render json: @piggy_bank.piggy_items, status: :ok
  end

  def create
    piggy_item = @piggy_bank.piggy_items.new(piggy_item_params)

    if piggy_item.save
      render json: piggy_item, status: :created
    else
      render_validation_error piggy_item
    end
  end

  private

  def find_piggy_bank
    @piggy_bank = current_user.piggy_banks.find(params[:piggy_bank_id])
  end

  def piggy_item_params
    params.permit(:published_on, :name, :balance_of_payments, :charge)
  end
end
