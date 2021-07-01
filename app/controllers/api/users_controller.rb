# frozen_string_literal: true

module Api
  class UsersController < Api::BaseController
    def show
      render json: current_user,
             include: %i[profile admin],
             methods: %i[options_list options dashboard_years],
             status: :ok
    end

    def update
      if current_user.update(user_params)
        render json: current_user,
               include: %i[profile admin],
               methods: %i[options_list options dashboard_years],
               status: :ok
      else
        render_validation_error current_user
      end
    end

    private

    def user_params
      params.permit(:daily_option, :unlimited_option, :piggy_bank_option)
    end
  end
end
