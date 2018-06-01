# frozen_string_literal: true

class Admin::UsersController < Admin::BaseController
  def index
    @users = User.all
  end
end
