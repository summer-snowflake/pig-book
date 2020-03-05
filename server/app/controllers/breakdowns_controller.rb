# frozen_string_literal: true

class BreakdownsController < ApplicationController
  before_action :authenticate_user!

  def index
    breakdowns =
      current_user.breakdowns.includes(:category).order(created_at: :desc)
    render json: breakdowns, include: :category, status: :ok
  end

  def create
    breakdown = current_user.breakdowns.new(breakdown_params)
    if breakdown.save
      render json: breakdown, include: :category, status: :created
    else
      render_validation_error breakdown
    end
  end

  def update
    breakdown = current_user.breakdowns.find(params[:id])
    if breakdown.update_attributes(breakdown_params)
      render json: breakdown, include: :category, status: :ok
    else
      render_validation_error breakdown
    end
  end

  private

  def breakdown_params
    params.permit(:name, :category_id)
  end
end
