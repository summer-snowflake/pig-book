# frozen_string_literal: true

class Api::BaseController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_with_user_token

  class BadRequestError < StandardError; end

  rescue_from BadRequestError, with: :render_bad_request_error
  rescue_from ActiveRecord::RecordNotFound,
              ActionController::RoutingError,
              with: :render_not_found_error
  rescue_from Exception, with: :render_exception_error

  private

  def authenticate_with_user_token
    render_authentication_error && return unless current_user && last_request_at
    return unless current_user.timedout?(last_request_at)
    render_authentication_error
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

  def render_bad_request_error(_err)
    render :bad_request_error, status: 400, formats: :json
  end

  def render_authentication_error
    render :authentication_error, status: 401, formats: :json
  end

  def render_not_found_error(_err = nil)
    render :not_found_error, status: 404, formats: :json
  end

  def render_validation_error(resource)
    @resource = resource
    render :validation_error, status: 422, formats: :json
  end

  def render_exception_error(_err)
    render :system_error, status: 500, formats: :json
  end
end
