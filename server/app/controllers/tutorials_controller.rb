# frozen_string_literal: true

class TutorialsController < ApplicationController
  before_action :authenticate_user!

  def show
    @tutorial = current_user.tutorial
    render json: @tutorial, status: :ok
  end
end
