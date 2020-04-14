# frozen_string_literal: true

class Admin::UsersController < Admin::BaseController
  def index
    render json: User.all.order(created_at: :desc),
           include: :admin, methods: %i[total current_sign_in_at], status: :ok
  end
end
