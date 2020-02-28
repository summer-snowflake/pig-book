# frozen_string_literal: true

class CategoriesController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: current_user.categories.order(created_at: :desc), status: :ok
  end

  def create
    category = current_user.categories.new(category_params)

    if category.save
      render json: category, status: :created
    else
      render_validation_error category
    end
  end

  private

  def category_params
    params.permit(:name, :balance_of_payments)
  end
end
