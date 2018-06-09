# frozen_string_literal: true

class Api::CategorizedPlacesController < Api::BaseController
  before_action :set_place, :set_category, only: %i[create]

  def create
    categorized_place =
      CategorizedPlace.create(place: @place, category: @category)
    if categorized_place.save
      head :created
    else
      render_validation_error categorized_place
    end
  end

  private

  def set_place
    @place = current_user.places.find(params[:place_id])
  end

  def set_category
    @category = current_user.categories.find(params[:category_id])
  end

  def categorized_place_params
    params.permit(:category_id, :place_id)
  end
end
