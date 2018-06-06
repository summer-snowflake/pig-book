# frozen_string_literal: true

class Api::BaseController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :authenticate_with_user_token

  private

  def authenticate_with_user_token
    unless current_user && params[:last_request_at]
      render(:error401, status: 401) && return
    end
    last_request_at = Time.parse(params[:last_request_at].to_s)
    render :error401, status: 401 if current_user.timedout?(last_request_at)
  end

  def current_user
    authenticate_with_http_token do |token, _options|
      return unless token
      User.find_by(authentication_token: token)
    end
  end

  def last_request_at_param
    params.permit(:last_request_at)
  end
end
