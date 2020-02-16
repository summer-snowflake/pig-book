# frozen_string_literal: true

class Api::V2::BaseController < ApplicationController
  include DeviseTokenAuth::Concerns::SetUserByToken
  skip_before_action :verify_authenticity_token
  before_action :authenticate_user!
end
