# frozen_string_literal: true

class Api::Categories::BreakdownsController < Api::BaseController
  before_action :set_category, only: %i[index]

  def index
    @breakdowns = @category.breakdowns.order(created_at: :desc)
    render json: @breakdowns
  end

  private

  def set_category
    @category = current_user.categories.find(params[:category_id])
  end
end
