# frozen_string_literal: true

class AssetsAccountsController < BaseController
  def index
    render json: current_user.assets_accounts, status: :ok
  end

  def create
    assets_account = current_user.assets_accounts.new(assets_account_params)

    if assets_account.save
      render json: assets_account, status: :created
    else
      render_validation_error assets_account
    end
  end

  def update
    assets_account = current_user.assets_accounts.find(params[:id])

    assets_account.assign_attributes(assets_account_params)
    assets_account.record_timestamps = false if assets_account.position_changed? || assets_account.checked_changed?

    if assets_account.save
      render json: assets_account, status: :ok
    else
      render_validation_error assets_account
    end
  end

  def destroy
    assets_account = current_user.assets_accounts.find(params[:id])
    assets_account.destroy!
  rescue ActiveRecord::DeleteRestrictionError
    render json: { errors: [I18n.t('errors.cannot_be_deleted')] },
           status: :forbidden
  end

  private

  def assets_account_params
    params.permit(:name, :balance_of_payments, :money, :currency, :position, :checked)
  end
end
