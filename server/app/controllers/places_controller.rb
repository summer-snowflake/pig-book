# frozen_string_literal: true

class PlacesController < BaseController
  def index
    places = current_user.places.includes(:categories).order(created_at: :desc)
    render json: places, include: :categories, status: :ok
  end

  def create
    place = current_user.places.new(place_params)
    if place.save
      render json: place, status: :created
    else
      render_validation_error place
    end
  end

  def update
    place = current_user.places.find(params[:id])
    if place.update(place_params)
      render json: place, status: :ok
    else
      render_validation_error place
    end
  end

  def destroy
    place = current_user.places.find(params[:id])
    place.destroy!
  rescue ActiveRecord::DeleteRestrictionError
    render json: { errors: [I18n.t('errors.cannot_be_deleted')] },
           status: :forbidden
  end

  private

  def place_params
    params.permit(:name)
  end
end
