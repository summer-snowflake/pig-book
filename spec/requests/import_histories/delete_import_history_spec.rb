# frozen_string_literal: true

require 'rails_helper'

describe 'DELETE /api/import_histories/:id' do
  let!(:user) { create(:user) }
  let!(:import_history1) { create(:import_history, user: user) }
  let!(:import_history2) { create(:import_history, user: user) }

  context 'ログインしていなかった場合' do
    it '401とデータが返ってくること' do
      delete "/api/import_histories/#{import_history1.id}"

      expect(response.status).to eq 401
      json = {
        error_message: I18n.t('messages.alert.authentication_error')
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'タイムアウト後のアクセスだった場合' do
    it '401とデータが返ってくること' do
      params = { last_request_at: user.timeout_in.ago }
      delete "/api/import_histories/#{import_history1.id}",
             params: params, headers: login_headers(user)

      expect(response.status).to eq 401
      json = {
        error_message: I18n.t('messages.alert.authentication_error')
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'ログインしていた場合' do
    it '204とデータが返ってくること' do
      params = { last_request_at: Time.zone.now }
      delete "/api/import_histories/#{import_history1.id}",
             params: params, headers: login_headers(user)

      expect(response.status).to eq 204
    end
  end
end
