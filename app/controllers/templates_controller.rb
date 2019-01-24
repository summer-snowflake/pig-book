# frozen_string_literal: true

class TemplatesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_last_request_at, :set_authentication_token, only: %i[index]

  def index
    @templates = current_user.templates
    @params = {
      templates: @templates,
      user_token: @access_token,
      last_request_at: @last_request_at
    }
  end
end
