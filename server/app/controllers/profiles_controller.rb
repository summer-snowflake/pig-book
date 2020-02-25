# frozen_string_literal: true

class ProfilesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_profile

  def show
    render json: @profile, status: :ok
  end

  def update
    if @profile.update(profile_params)
      I18n.locale = @profile.locale
      render json: @profile, status: :ok
    else
      render render_validation_error
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
