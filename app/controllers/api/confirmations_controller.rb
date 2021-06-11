# frozen_string_literal: true

module Api
  class ConfirmationsController < DeviseTokenAuth::ConfirmationsController
    def show
      confirmation_token = resource_params[:confirmation_token]
      @resource = resource_class.confirm_by_token(confirmation_token)

      raise ActionController::RoutingError, 404 if @resource.errors.present?

      yield @resource if block_given?

      # redirect_header_options = { account_confirmation_success: true }

      signed_in_resource.save! if signed_in?(resource_name)

      # NOTE: use head instead of redirect_to
      # redirect_to(redirect_to_link)
      head :ok
    end
  end
end
