# frozen_string_literal: true

class UsersController < ApplicationController
  before_action :authenticate_user!

  def show
    render json: current_user.to_json
  end
end
