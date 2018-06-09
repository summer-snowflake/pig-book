# frozen_string_literal: true

class Api::Places::CategoriesController < Api::BaseController
  before_action :set_place, only: %i[index]

  def index
    @categories = current_user.categories - @place.categories
    render json: @categories
  end

  private

  def set_place
    @place = current_user.places.find(params[:place_id])
  end
end
