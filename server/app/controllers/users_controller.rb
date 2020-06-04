# frozen_string_literal: true

class UsersController < BaseController
  def show
    render json: current_user.to_json(include: :admin, methods: :options_list)
  end
end
