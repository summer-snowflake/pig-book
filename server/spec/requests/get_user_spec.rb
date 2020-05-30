# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/user', autodoc: true do
  let!(:user) { create(:user, :active) }

  context 'when NOT logged in.' do
    it 'returns status code 401 and json errors data' do
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

  context 'when logged in.' do
    it 'returns status code 200 and json user data' do
      get '/api/user', headers: login_headers_with_login(user)

      expect(response.status).to eq 200
      json = {
        email: user.email,
        uid: user.email,
        name: nil,
        nickname: nil,
        provider: 'email',
        image: nil,
        allow_password_change: false,
        categories_count: 0,
        breakdowns_count: 0,
        places_count: 0,
        records_count: 0,
        daily_option: false
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end
end
