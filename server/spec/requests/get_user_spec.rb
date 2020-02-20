# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/user' do
  let!(:user) { create(:user) }

  context 'ログインしていなかった場合' do
    it '401とデータが返ってくること' do
      get '/api/user'

      expect(response.status).to eq 401
      json = {
        errors: [
          'アカウント登録もしくはログインしてください。'
        ]
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'ログインしていた場合' do
    it '200とデータが返ってくること' do
      get '/api/user', headers: login_headers_with_login(user)

      expect(response.status).to eq 200
      json = {
        email: user.email,
        uid: user.email,
        name: nil,
        nickname: nil,
        provider: 'email',
        image: nil,
        allow_password_change: false
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end
end
