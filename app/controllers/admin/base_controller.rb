# frozen_string_literal: true

class Admin::BaseController < ApplicationController
  before_action :authenticate_user!
  before_action :authenticate_admin!

  def authenticate_admin!
    return if current_user.admin?
    flash[:alert] = I18n.t('messages.alert.unauthenticate_admin')
    redirect_to mypage_path
  end
end
