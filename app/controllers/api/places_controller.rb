# frozen_string_literal: true

class Api::PlacesController < Api::BaseController
  before_action :set_place, only: %i[destroy]

  def index
    @places = current_user.places
    render json: @places
  end

  def destroy
    @place.destroy
    head @place.destroyed? ? :ok : :forbidden
  end

  private

  def set_place
    @place = current_user.places.find(params[:id])
  end
end
