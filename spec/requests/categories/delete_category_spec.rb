# frozen_string_literal: true

require 'rails_helper'

describe 'DELETE /api/categories/:id' do
  let!(:user) { create(:user) }
  let!(:category1) { create(:category, user: user, balance_of_payments: false) }
  let!(:category2) { create(:category, user: user, balance_of_payments: true) }

  context 'ログインしていなかった場合' do
    it '401とデータが返ってくること' do
      delete "/api/categories/#{category1.id}"

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
      delete "/api/categories/#{category1.id}",
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
      delete "/api/categories/#{category1.id}",
             params: params, headers: login_headers(user)

      expect(response.status).to eq 204
    end
  end
end
