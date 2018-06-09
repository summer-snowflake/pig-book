# frozen_string_literal: true

class Api::CategoriesController < Api::BaseController
  before_action :set_category, only: %i[destroy]

  def index
    @categories =
      current_user.categories.includes(:places).order(created_at: :desc)
    render json: @categories
  end

  def create
    @category = current_user.categories.new(category_params)
    if @category.save
      head :created
    else
      render_validation_error @category
    end
  end

  def destroy
    @category.destroy
    if @category.destroyed?
      head :no_content
    else
      render_not_found_error
    end
  end

  private

  def set_category
    @category = current_user.categories.find(params[:id])
  end

  def category_params
    params.permit(:name, :balance_of_payments)
  end
end
