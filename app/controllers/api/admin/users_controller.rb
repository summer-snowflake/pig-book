# frozen_string_literal: true

require 'rake'

class Api::Admin::UsersController < Api::BaseController
  before_action :set_user, only: %i[tally]

  def tally
    Rails.application.load_tasks
    Rake::Task['tally:update']
      .execute(user_id: @user.id, operator_id: current_user.id)
    Rake::Task['tally:update'].clear
    render json: @user.events.last
  end

  private

  def set_user
    @user = User.find(params[:user_id])
  end
end
