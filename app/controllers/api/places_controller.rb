# frozen_string_literal: true

class Api::PlacesController < ApplicationController
  before_action :authenticate_user!

  def index
    @places = current_user.places
    render json: @places
  end
end
