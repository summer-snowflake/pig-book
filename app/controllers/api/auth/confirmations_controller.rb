# frozen_string_literal: true

module Api
  module Auth
    class ConfirmationsController < DeviseTokenAuth::ConfirmationsController
      before_action :set_resource, only: %i[show]

      def show
        yield @resource if block_given?

        redirect_header_options = { account_confirmation_success: true }

        if signed_in?(resource_name)
          token = signed_in_resource.create_token && signed_in_resource.save!
          redirect_headers = build_redirect_headers(token.token, token.client, redirect_header_options)

          redirect_to_link = signed_in_resource.build_auth_url(redirect_url, redirect_headers)
        else
          redirect_to_link = DeviseTokenAuth::Url.generate(redirect_url, redirect_header_options)
        end

        redirect_to(redirect_to_link)
      end

      private

      def set_resource
        @resource = resource_class.confirm_by_token(resource_params[:confirmation_token])
        return if @resource.active_for_authentication? || @resource.errors.empty?

        render 'errors/404', status: :not_found
      end
    end
  end
end
