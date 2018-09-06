# frozen_string_literal: true

class Api::RecentlyUsedCategoriesController < Api::BaseController
  def index
    @categories = current_user.recently_used_categories
    render json: @categories
  end
end
