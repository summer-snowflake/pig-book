# frozen_string_literal: true

require 'rails_helper'

describe 'PATCH /api/places' do
  let!(:user) { create(:user) }
  let!(:place) { create(:place, user: user) }

  context 'ログインしていなかった場合' do
    it '401とデータが返ってくること' do
      patch "/api/places/#{place.id}"

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
        name: 'ばしょ',
        balance_of_payments: true
      }
      patch "/api/places/#{place.id}",
            params: params, headers: login_headers(user)

      expect(response.status).to eq 200
      json = {
        name: 'ばしょ',
        categories: []
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end
end
