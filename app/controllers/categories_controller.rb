# frozen_string_literal: true

class CategoriesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_category, only: %i[destroy]

  def index
    @categories = current_user.categories
    @category = Category.new
  end

  def create
    @category = Category.new(category_params.merge(user: current_user))
    if @category.save
      redirect_to categories_path, notice: I18n.t('messages.notice.add')
    else
      @categories = current_user.categories
      render :index
    end
  end

  def destroy
    @category.destroy
    redirect_to categories_path
  end

  private

  def set_category
    @category = current_user.categories.find(params[:id])
  end

  def category_params
    params.require(:category).permit(:balance_of_payments, :name)
  end
end
