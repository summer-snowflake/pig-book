# frozen_string_literal: true

class Api::V2::BaseSettingsController < Api::V2::BaseController
  before_action :set_base_setting, only: %w[show]

  def show
    render json: @base_setting
  end

  private

  def set_base_setting
    @base_setting = current_user.base_setting
  end
end
