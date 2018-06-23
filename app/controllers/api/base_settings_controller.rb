# frozen_string_literal: true

class Api::BaseSettingsController < Api::BaseController
  def show
    @base_setting = current_user.base_setting

    render json: @base_setting
  end
end
