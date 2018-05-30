# frozen_string_literal: true

class PlacesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_place, only: %i[destroy]

  def index
    @places = current_user.places
  end

  def destroy
    @place.destroy
    redirect_to places_path
  end

  private

  def set_place
    @place = current_user.places.find(params[:id])
  end
end
