# frozen_string_literal: true

class Admin::UsersController < Admin::BaseController
  def index
    render json: User.all.to_json(methods: :admin?), status: :ok
  end
end
