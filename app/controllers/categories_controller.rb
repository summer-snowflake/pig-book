# frozen_string_literal: true

class CategoriesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_last_request_at, :set_authentication_token, only: %i[index]

  def index
    @categories = current_user.categories
    @category = Category.new
    @params = {
      categories: @categories,
      user_token: @access_token,
      last_request_at: @last_request_at
    }
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

  private

  def category_params
    params.require(:category).permit(:balance_of_payments, :name)
  end
end
