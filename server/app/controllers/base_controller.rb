# frozen_string_literal: true

class BaseController < ApplicationController
  before_action :authenticate_user!
  before_action :set_locale

  private

  def set_locale
    profile = current_user.profile || current_user.build_profile
    I18n.locale = profile.locale
  end
end
