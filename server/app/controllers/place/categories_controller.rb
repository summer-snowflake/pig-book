# frozen_string_literal: true

class Place::CategoriesController < ApplicationController
  before_action :authenticate_user!

  def index
    place = current_user.places.find(params[:place_id])
    render json: place.categories, status: :ok
  end
end
