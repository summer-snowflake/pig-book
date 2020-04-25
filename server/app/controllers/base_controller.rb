# frozen_string_literal: true

class BaseController < ApplicationController
  before_action :authenticate_user!
  before_action :set_locale

  private

  def set_locale
    I18n.locale = current_user.profile.locale
  end
end
