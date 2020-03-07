# frozen_string_literal: true

class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken

  rescue_from ActiveRecord::RecordNotFound,
              ActionController::RoutingError,
              with: :render_not_found_error

  def render_validation_error(resource)
    render json: { errors: resource.errors.full_messages },
           status: :unprocessable_entity
  end

  def render_not_found_error
    render json: { erorrs: [I18n.t('errors.not_found')] },
           status: :not_found
  end
end
