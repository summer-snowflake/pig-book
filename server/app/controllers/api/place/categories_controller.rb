# frozen_string_literal: true

module Api
  module Place
    class CategoriesController < Api::BaseController
      def index
        place = current_user.places.find(params[:place_id])
        render json: place.categories, status: :ok
      end

      def create
        place = current_user.places.find(params[:place_id])
        place.categorized_places.delete_all
        CategorizedPlace.transaction do
          params[:category_ids].each do |category_id|
            place.categorized_places.create!(category_id: category_id)
          end
        end

        render json: place.categories, status: :ok
      end
    end
  end
end
