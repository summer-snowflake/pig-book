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
end
