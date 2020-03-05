# frozen_string_literal: true

class OptionsRequestController < ApplicationController
  ACCESS_CONTROL_ALLOW_HEADERS =
    %i[Accept Origin Content-Type Authorization client access-token uid].freeze
  ACCESS_CONTROL_ALLOW_METHODS = %i[GET PATCH OPTIONS].freeze

  def preflight
    set_preflight_headers!
    head :ok
  end

  private

  def set_preflight_headers!
    response.headers['Access-Control-Allow-Headers'] =
      ACCESS_CONTROL_ALLOW_HEADERS.join(',')
    response.headers['Access-Control-Allow-Methods'] =
      ACCESS_CONTROL_ALLOW_METHODS.join(',')
  end
end
