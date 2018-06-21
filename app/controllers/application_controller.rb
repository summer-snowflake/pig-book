# frozen_string_literal: true

class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  class BadRequestError < StandardError; end

  rescue_from Exception, with: :render_exception_error
  rescue_from BadRequestError, with: :render_bad_request_error
  rescue_from ActiveRecord::RecordNotFound,
              ActionController::RoutingError,
              with: :render_not_found_error

  before_action :set_locale

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

  protected

  def set_locale
    I18n.locale = locale
  end

  def locale
    current_user&.base_setting&.locale || I18n.default_locale
  end

  def render_bad_request_error(_err)
    render :bad_request_error, status: 400
  end

  def render_not_found_error(_err = nil)
    render :not_found_error, status: 404
  end

  def render_exception_error(err)
    notify_to_slack(err)
    render :system_error, status: 500
  end

  def notify_to_slack(err)
    url = "#{request.protocol}#{request.host_with_port}#{request.fullpath}"
    notifier = Slack::Notifier.new ENV['SLACK_WEBHOOK_URL']
    attachments = {
      pretext: "*500 #{err}*\nurl: #{url}\nuser_email: #{current_user&.email}",
      text: "```\n" + [*err.backtrace].take(10).join("\n") + "\n```",
      mrkdwn: true
    }
    notifier.post attachments
  end
end
