# frozen_string_literal: true

require 'rails_helper'

describe 'POST /api/v2/auth/sign_in' do
  let!(:user) { create(:user, :active) }

  context 'ログインしていない場合' do
    it '401とデータが返ってくること' do
      get '/api/v2/base_setting'

      expect(response.status).to eq 401
      json = {
        errors: ['アカウント登録もしくはログインしてください。']
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'ログインしていた場合' do
    it '200が返ってくること' do
      get '/api/v2/base_setting', headers: v2_login_headers(user)
      expect(response.status).to eq 200
      json = {
        currency: 'yen',
        human_currency: '¥'
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end
end
