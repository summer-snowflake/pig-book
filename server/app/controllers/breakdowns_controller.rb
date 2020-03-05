# frozen_string_literal: true

class BreakdownsController < ApplicationController
  before_action :authenticate_user!

  def index
    breakdowns =
      current_user.breakdowns.includes(:category).order(created_at: :desc)
    render json: breakdowns, include: :category, status: :ok
  end
end
