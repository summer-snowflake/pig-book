# frozen_string_literal: true

class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def after_sign_out_path_for(_resource)
    new_user_session_path
  end

  def after_sign_in_path_for(_resource)
    mypage_path
  end

  def set_last_request_at
    @last_request_at = request.env['warden'].session['last_request_at']
  end

  def set_authentication_token
    @access_token = current_user.authentication_token
  end
end
