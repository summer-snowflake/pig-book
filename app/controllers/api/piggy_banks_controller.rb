# frozen_string_literal: true

module Api
  class PiggyBanksController < Api::BaseController
    def index
      render json: current_user.piggy_banks, status: :ok
    end

    def show
      piggy_bank = current_user.piggy_banks.find(params[:id])
      render json: piggy_bank, status: :ok
    end

    def create
      piggy_bank = current_user.piggy_banks.new(piggy_bank_params)

      if piggy_bank.save
        render json: piggy_bank, status: :created
      else
        render_validation_error piggy_bank
      end
    end

    def update
      piggy_bank = current_user.piggy_banks.find(params[:id])

      if piggy_bank.update(piggy_bank_params)
        render json: piggy_bank, status: :ok
      else
        render_validation_error piggy_bank
      end
    end

    def destroy
      piggy_bank = current_user.piggy_banks.find(params[:id])
      piggy_bank.destroy!
    rescue ActiveRecord::DeleteRestrictionError
      render json: { errors: [I18n.t('errors.cannot_be_deleted')] },
             status: :forbidden
    end

    private

    def piggy_bank_params
      params.permit(:title, :description)
    end
  end
end
