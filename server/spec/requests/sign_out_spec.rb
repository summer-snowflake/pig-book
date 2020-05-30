# frozen_string_literal: true

require 'rails_helper'

describe 'DELETE /api/auth/sign_out', autodoc: true do
  let!(:user) { create(:user, :active) }

  context 'ログインしていない場合' do
    it 'returns status code 404 and json errors data' do
      delete '/api/auth/sign_out'
      json = {
        errors: [
          'ユーザーが見つからないか、ログインしていません。'
        ],
        success: false
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'ログインしていた場合' do
    it 'returns status code 200 and json user data' do
      params = {
        email: user.email,
        password: 'password'
      }.to_json
      headers = { 'Content-Type': 'application/json' }
      post '/api/auth/sign_in', params: params, headers: headers
      expect(response.status).to eq 200

      delete '/api/auth/sign_out', headers: login_headers_with_login(user)
      expect(response.status).to eq 200
    end
  end
end
