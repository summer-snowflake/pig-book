# frozen_string_literal: true

module Api
  class BaseController < ApplicationController
    protect_from_forgery with: :null_session

    include DeviseTokenAuth::Concerns::SetUserByToken

    rescue_from Exception, with: :render_exception_error
    rescue_from ActiveRecord::RecordNotFound,
                ActionController::RoutingError,
                with: :render_not_found_error

    before_action :authenticate_user!
    before_action :set_locale

    def render_validation_error(resource)
      render json: { errors: resource.errors.full_messages },
             status: :unprocessable_entity
    end

    def render_not_found_error
      render json: { erorrs: [I18n.t('errors.not_found')] },
             status: :not_found
    end

    def render_exception_error(err)
      notify_to_slack(err)
      render :system_error, status: 500
    end

    private

    def notify_to_slack(err)
      url = "#{request.protocol}#{request.host_with_port}#{request.fullpath}"
      notifier = Slack::Notifier.new ENV['SLACK_WEBHOOK_URL']
      attachments = {
        pretext: "*500 #{err}*\nurl: #{url}\nuser_email: #{current_user&.email}",
        text: "```\n#{[*err.backtrace].take(25).join("\n")}\n```",
        mrkdwn: true
      }
      notifier.post attachments
    end

    def set_locale
      profile = current_user.profile || current_user.build_profile
      I18n.locale = profile.locale
    end
  end
end
