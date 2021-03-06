# frozen_string_literal: true

module Api
  module Admin
    class UsersController < Api::Admin::BaseController
      def index
        fetcher = Users::Fetcher.new
        fetcher.find_all_by(users_params)
        render json: { list: fetcher.users, max_page: fetcher.max_page },
               include: :admin,
               methods: %i[active current_sign_in_at], status: :ok
      end

      private

      def users_params
        params.permit(:page)
      end
    end
  end
end
