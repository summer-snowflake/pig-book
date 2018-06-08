# frozen_string_literal: true

class Api::PlacesController < Api::BaseController
  before_action :set_place, only: %i[destroy]

  def index
    @places = current_user.places
    render json: @places
  end

  def create
    @place = current_user.places.new(place_params)
    if @place.save
      head :created
    else
      render_validation_error @place
    end
  end

  def destroy
    @place.destroy
    if @place.destroyed?
      head :no_content
    else
      render_not_found_error
    end
  end

  private

  def set_place
    @place = current_user.places.find(params[:id])
  end

  def place_params
    params.permit(:name)
  end
end
