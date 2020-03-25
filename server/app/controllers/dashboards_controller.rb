# frozen_string_literal: true

class DashboardsController < ApplicationController
  before_action :authenticate_user!

  def show
    render json: {
      event: current_user.tally_events.find_by(year: params[:year])
    }
  end

  def update
    event = current_user.tally_events.create(year: params[:year])
    render json: {
      event: event
    }
  end
end
