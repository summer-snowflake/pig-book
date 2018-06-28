# frozen_string_literal: true

class TagsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_last_request_at, :set_authentication_token, only: %i[index]

  def index
    @tags = current_user.tags.order(created_at: :desc)
    @params = {
      tags: @tags,
      user_token: @access_token,
      last_request_at: @last_request_at
    }
  end
end
