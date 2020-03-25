# frozen_string_literal: true

class DashboardsController < ApplicationController
  before_action :authenticate_user!

  def show
    render json: {
      event: current_user.events.tally.last # TODO: 年分
    }
  end

  # 集計
  def update
    current_user.events.create!(category: :tally, operator: current_user)
    head :ok
  end
end
