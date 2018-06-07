# frozen_string_literal: true

class PlacesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_place, only: %i[destroy]
  before_action :set_last_request_at, :set_authentication_token, only: %i[index]

  def index
    @places = current_user.places
    @params = {
      places: @places,
      user_token: @access_token,
      last_request_at: @last_request_at
    }
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
