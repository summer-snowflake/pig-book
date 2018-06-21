# frozen_string_literal: true

class BaseSettingsController < ApplicationController
  before_action :authenticate_user!

  def show
    @base_setting = current_user.base_setting
  end

  def update
    @base_setting = current_user.base_setting
    if @base_setting.update(base_setting_params)
      I18n.locale = @base_setting.locale
      flash[:notice] = I18n.t('messages.notice.update')
    else
      flash[:alert] = I18n.t('messages.alert.failed_update')
    end
    redirect_to base_setting_path
  end

  private

  def base_setting_params
    params.require(:profile).permit(:locale)
  end
end
