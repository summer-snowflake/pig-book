# frozen_string_literal: true

module RequestSpecHelper
  def login_headers_with_login(user)
    headers = { 'Content-Type': 'application/json' }
    response_headers = login_response_headers(user)
    headers.merge(
      'access-token': response_headers['access-token'],
      'client': response_headers['client'],
      'uid': response_headers['uid']
    )
  end

  def login_headers(response_headers)
    {
      'Content-Type': 'application/json',
      'access-token': response_headers['access-token'],
      'client': response_headers['client'],
      'uid': response_headers['uid']
    }
  end

  def login_response_headers(user)
    params = {
      email: user.email,
      password: user.password
    }.to_json
    headers = { 'Content-Type': 'application/json' }
    post '/api/auth/sign_in', params: params, headers: headers

    response.headers
  end
end
