# frozen_string_literal: true

class Api::RecentlyUsedController < Api::BaseController
  def index
    render json: current_user, include: '**'
  end
end
