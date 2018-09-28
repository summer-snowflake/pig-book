# frozen_string_literal: true

require 'rails_helper'

describe 'PATCH /api/base_setting' do
  let!(:user) { create(:user) }

  context 'ログインしていなかった場合' do
    it '401とデータが返ってくること' do
      patch '/api/base_setting'

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
        last_request_at: Time.zone.now,
        memo: 'めもめもめもめも'
      }
      patch '/api/base_setting',
            params: params, headers: login_headers(user)

      expect(response.status).to eq 200
    end
  end
end
