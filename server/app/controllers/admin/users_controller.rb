# frozen_string_literal: true

class Admin::UsersController < Admin::BaseController
  def index
    render json: User.all.to_json(include: :admin, methods: :total), status: :ok
  end
end