# frozen_string_literal: true

module Api
  module Admin
    class BaseController < Api::BaseController
      before_action :authenticate_admin!

      def authenticate_admin!
        return if current_user.admin?

        render json: { errors: [I18n.t('errors.unauthorized_as_admin')] }, status: :unauthorized
      end
    end
  end
end
