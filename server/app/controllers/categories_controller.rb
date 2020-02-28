# frozen_string_literal: true

class CategoriesController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: current_user.categories.order(created_at: :desc), status: :ok
  end
end
