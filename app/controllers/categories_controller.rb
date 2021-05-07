# frozen_string_literal: true

class CategoriesController < BaseController
  def index
    render json: current_user.categories.order(created_at: :desc), status: :ok
  end

  def show
    category = current_user.categories.find(params[:id])
    render json: category, include: %i[breakdowns places], status: :ok
  end

  def create
    category = current_user.categories.new(category_params)

    if category.save
      render json: category, status: :created
    else
      render_validation_error category
    end
  end

  def update
    category = current_user.categories.find(params[:id])

    if category.update(category_params)
      render json: category, status: :ok
    else
      render_validation_error category
    end
  end

  def destroy
    category = current_user.categories.find(params[:id])
    category.destroy!
  rescue ActiveRecord::DeleteRestrictionError
    render json: { errors: [I18n.t('errors.cannot_be_deleted')] },
           status: :forbidden
  end

  private

  def category_params
    params.permit(:name, :balance_of_payments)
  end
end
