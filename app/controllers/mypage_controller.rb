# frozen_string_literal: true

class MypageController < ApplicationController
  before_action :authenticate_user!

  def show; end
end
