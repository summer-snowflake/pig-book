# frozen_string_literal: true

require 'rails_helper'

describe 'POST /api/categories' do
  let!(:user) { create(:user) }

  context 'ログインしていなかった場合' do
    it '401とデータが返ってくること' do
      post '/api/categories'

      expect(response.status).to eq 401
      json = {
        error_message: I18n.t('messages.alert.authentication_error')
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'ログインしていた場合' do
    it '201が返ってくること' do
      params = {
        last_request_at: Time.zone.now,
        name: '新しいカテゴリ',
        balance_of_payments: true
      }
      post '/api/categories',
          params: params, headers: login_headers(user)

      expect(response.status).to eq 201
    end
  end
end
