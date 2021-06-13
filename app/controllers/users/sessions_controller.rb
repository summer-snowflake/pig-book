# frozen_string_literal: true

module Users
  class SessionsController < Devise::SessionsController
    def create
      super
      uri = URI("http://#{ENV.fetch('HOST_NAME')}:#{ENV.fetch('REACT_APP_SERVER_PORT')}/api/auth/sign_in")
      req = Net::HTTP::Post.new(uri)
      req.set_form_data({ email: params[:user][:email], password: params[:user][:password] })

      response = Net::HTTP.start(uri.hostname, uri.port) do |http|
        http.request(req)
      end
      #res = http.post('/api/auth/sign_in', { email: params[:user][:email], password: params[:user][:password] })

      p response
      p response.code.start_with?('2')
      p "====="
    end

    private

    def after_sign_out_path_for(_resource)
      new_user_session_path
    end

    def after_sign_in_path_for(_resource)
      mypage_path
    end
  end
end
