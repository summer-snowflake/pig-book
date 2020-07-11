# frozen_string_literal: true

class UsersController < BaseController
  def show
    render json: current_user.to_json(include: :admin, methods: %i[options_list options])
  end

  def update
    if current_user.update(user_params)
      render json: current_user, status: :ok
    else
      render render_validation_error
    end
  end

  private

  def user_params
    params.require(:user).permit(:daily_option, :unlimited_option)
  end
end
