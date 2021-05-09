# frozen_string_literal: true

module Users
  class SessionsController < Devise::SessionsController
    protected

    def after_sign_in_path_for(_resource)
      mypage_path
    end
  end
end
