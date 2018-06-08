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
      render_error @place
    end
  end

  def destroy
    @place.destroy
    head @place.destroyed? ? :ok : :forbidden
  end

  private

  def set_place
    @place = current_user.places.find(params[:id])
  end

  def place_params
    params.permit(:name)
  end
end
