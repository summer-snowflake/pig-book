# frozen_string_literal: true

class BaseSettingController < ApplicationController
  before_action :authenticate_user!

  def show; end
end
