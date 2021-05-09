# frozen_string_literal: true

module Users
  class RegistrationsController < Devise::RegistrationsController
    protected

    def build_resource(hash = {})
      self.resource = resource_class.new_with_session(hash.merge(uid: hash[:email]), session)
    end

    def after_inactive_sign_up_path_for(_resource)
      new_user_session_path
    end
  end
end
