# frozen_string_literal: true

module Api
  module Admin
    class BaseController < Api::BaseController
      before_action :authenticate_admin!

      def authenticate_admin!
        return if current_user.admin?

        flash[:alert] = I18n.t('errors.unauthorized_as_admin')
        redirect_to new_user_session_path
      end
    end
  end
end
