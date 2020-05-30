# frozen_string_literal: true

class TutorialsController < BaseController
  def show
    @tutorial = current_user.tutorial
    render json: @tutorial, status: :ok
  end
end
