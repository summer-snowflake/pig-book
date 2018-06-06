# frozen_string_literal: true

class Api::BaseController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_with_user_token

  private

  def authenticate_with_user_token
    render :error401, status: 401 if current_user&.timedout?(30.minutes.ago)
  end

  def current_user
    authenticate_with_http_token do |token, _options|
      User.find_by(authentication_token: token)
    end
  end
end
