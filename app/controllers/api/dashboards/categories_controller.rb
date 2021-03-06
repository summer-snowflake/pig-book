# frozen_string_literal: true

module Api
  module Dashboards
    class CategoriesController < Api::BaseController
      def show
        fetcher = Dashboard::Fetcher.new(user: current_user)
        category_dashboard = fetcher.find_by_category(year: params[:dashboard_year], category_id: params[:id])
        render json: category_dashboard, status: :ok
      end
    end
  end
end
