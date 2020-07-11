# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/user', autodoc: true do
  let!(:user) { create(:user, :active, daily_option: true) }

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
        tags_count: 0,
        daily_option: true,
        unlimited_option: false,
        options_list: 'デイリーチャート',
        options: [
          {
            id: 1,
            name: 'デイリーチャート',
            column: 'daily_option',
            value: true
          },
          {
            id: 2,
            name: '無制限利用',
            column: 'unlimited_option',
            value: false
          }
        ]
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end
end
