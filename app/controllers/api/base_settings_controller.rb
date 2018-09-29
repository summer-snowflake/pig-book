# frozen_string_literal: true

class Api::BaseSettingsController < Api::BaseController
  before_action :set_base_setting, only: %w[show update]

  def show
    render json: @base_setting
  end

  def update
    if @base_setting.update(base_setting_params)
      head :ok
    else
      render_validation_error @base_setting
    end
  end

  private

  def base_setting_params
    params.permit(:memo)
  end

  def set_base_setting
    @base_setting = current_user.base_setting
  end
end
