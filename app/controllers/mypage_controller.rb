# frozen_string_literal: true

class MypageController < ApplicationController
  before_action :authenticate_user!
  before_action :set_histories, only: %i[show]

  def show; end
end
