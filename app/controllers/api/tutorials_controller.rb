# frozen_string_literal: true

module Api
  class TutorialsController < Api::BaseController
    def show
      @tutorial = current_user.tutorial
      render json: @tutorial, status: :ok
    end
  end
end
