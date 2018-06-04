# frozen_string_literal: true

class Api::BaseController < ApplicationController
  before_action :authenticate_user_with_token

  def authenticate_user_with_token
    p "****************"
    p user_session
    p "***********************"
  end
end
