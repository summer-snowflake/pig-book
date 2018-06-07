# frozen_string_literal: true

class Api::BaseController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_with_user_token

  rescue_from ActiveRecord::RecordNotFound,
              ActionController::RoutingError,
              with: :not_found_error

  private

  def authenticate_with_user_token
    unless current_user && params[:last_request_at]
      render(:error401, status: 401) && return
    end
    render :error401, status: 401 if current_user.timedout?(last_request_at)
  end

  def current_user
    authenticate_with_http_token do |token, _options|
      return unless token
      User.find_by(authentication_token: token)
    end
  end

  def last_request_at
    last_request_at = params[:last_request_at]
    if /^[0-9]+$/.match?(last_request_at)
      Time.at(last_request_at.to_i).utc
    else
      Time.parse(last_request_at)
    end
  end

  def not_found_error
    render :not_found_error, status: 404
  end
end
