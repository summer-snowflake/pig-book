# frozen_string_literal: true

module Api
  class ProfilesController < BaseController
    before_action :set_profile

    def show
      render json: @profile, status: :ok
    end

    def update
      if @profile.update(profile_params)
        render json: @profile, status: :ok
      else
        render_validation_error @profile
      end
    end

    private

    def set_profile
      @profile = current_user.profile || current_user.build_profile
    end

    def profile_params
      params.require(:profile).permit(:locale, :currency, :memo)
    end
  end
end
