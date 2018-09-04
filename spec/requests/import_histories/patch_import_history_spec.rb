# frozen_string_literal: true

require 'rails_helper'

describe 'PATCH /api/import_histories' do
  let!(:user) { create(:user) }
  let!(:import_history) { create(:import_history, user: user) }

  context 'ログインしていなかった場合' do
    it '401とデータが返ってくること' do
      patch "/api/import_histories/#{import_history.id}"

      expect(response.status).to eq 401
      json = {
        error_message: I18n.t('messages.alert.authentication_error')
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'ログインしていた場合' do
    it '200が返ってくること' do
      params = {
        row: '2014-03-28,飲食費,食事,すき家,430,,',
        last_request_at: Time.zone.now
      }
      patch "/api/import_histories/#{import_history.id}",
            params: params, headers: login_headers(user)

      expect(response.status).to eq 200
      expect(import_history.reload.messages)
        .to eq 'カテゴリ名が登録されていません / 内訳が登録されていません / 店名・施設名が登録されていません'
    end
  end
end
