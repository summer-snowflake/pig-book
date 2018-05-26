# frozen_string_literal: true

module FeatureSpecHelper
  def sign_in(user)
    user.confirmed_at = Time.now
    user.save
    login_as(user, scope: :user)
    visit mypage_path
  end
end
