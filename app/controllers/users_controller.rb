# frozen_string_literal: true

class UsersController < BaseController
  def show
    render json: current_user.to_json(include: :admin, methods: %i[options_list options dashboard_years])
  end

  def update
    if current_user.update(user_params)
      render json: current_user.to_json(include: :admin, methods: %i[options_list options dashboard_years]), status: :ok
    else
      render_validation_error current_user
    end
  end

  private

  def user_params
    params.require(:user).permit(:daily_option, :unlimited_option, :piggy_bank_option)
  end
end