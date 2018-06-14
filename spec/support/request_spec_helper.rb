# frozen_string_literal: true

module RequestSpecHelper
  def login_headers(user)
    token = user.authentication_token
    { Authorization: 'Token token=' + token }
  end
end
