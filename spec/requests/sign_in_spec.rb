# frozen_string_literal: true

require 'rails_helper'

describe 'POST /api/auth/sign_in', autodoc: true do
  let!(:user) { create(:user, :active) }

  context 'ログイン情報が不正な場合' do
    it 'returns status code 401 and json errors data' do
      post '/api/auth/sign_in'

      expect(response.status).to eq 401
      json = {
        errors: [
          'ログイン用の認証情報が正しくありません。再度お試しください。'
        ],
        success: false
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'ログイン情報が正しい場合' do
    it 'returns status code 200 and json user data' do
      params = {
        email: user.email,
        password: 'password'
      }.to_json
      headers = { 'Content-Type': 'application/json' }
      post '/api/auth/sign_in', params: params, headers: headers

      expect(response.status).to eq 200
    end
  end
end
