# frozen_string_literal: true

class DashboardsController < ApplicationController
  before_action :authenticate_user!

  def index
    fetcher = Dashboard::Fetcher.new(user: current_user)
    render json: fetcher.all
  end

  def show
    fetcher = Dashboard::Fetcher.new(user: current_user)
    render json: fetcher.find_by(year: params[:year].to_i)
  end

  def update
    event = current_user.tally_events.create(year: params[:year])
    render json: {
      event: event
    }
  end
end
