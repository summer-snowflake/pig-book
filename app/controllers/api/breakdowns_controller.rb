# frozen_string_literal: true

class Api::BreakdownsController < Api::BaseController
  before_action :set_breakdown, only: %i[update destroy]

  def index
    @breakdowns = current_user
                  .breakdowns
                  .includes(:category)
                  .order(created_at: :desc)
    render json: @breakdowns
  end

  def create
    @breakdown = current_user.breakdowns.new(breakdown_params)
    if @breakdown.save
      head :created
    else
      render_validation_error @breakdown
    end
  end

  def update
    if @breakdown.update_attributes(breakdown_params)
      render json: @breakdown, status: :ok
    else
      render_validation_error @breakdown
    end
  end

  def destroy
    @breakdown.destroy
    if @breakdown.destroyed?
      head :no_content
    else
      render_not_found_error
    end
  end

  private

  def set_breakdown
    @breakdown = current_user.breakdowns.find(params[:id])
  end

  def breakdown_params
    params.permit(:name, :category_id)
  end
end
