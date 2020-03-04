# frozen_string_literal: true

class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken

  def render_validation_error(resource)
    render json: { errors: resource.errors.full_messages },
           status: :unprocessable_entity
  end
end
