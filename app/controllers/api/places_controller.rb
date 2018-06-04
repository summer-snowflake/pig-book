# frozen_string_literal: true

class Api::PlacesController < Api::BaseController
  before_action :set_place, only: %i[destroy]

  def destroy
    @place.destroy
    head @place.destroyed? ? :ok : :forbidden
  end

  private

  def set_place
    @place = current_user.places.find(params[:id])
  end
end
