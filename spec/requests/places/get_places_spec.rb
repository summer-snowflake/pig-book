# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/places' do
  let!(:user) { create(:user) }
  let!(:place1) { create(:place, user: user) }
  let!(:place2) { create(:place, user: user) }

  context 'ログインしていなかった場合' do
    it '401とデータが返ってくること' do
      get '/api/places'

      expect(response.status).to eq 401
      json = {
        error_messages: I18n.t('messages.alert.authentication_error')
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'ログインしていた場合' do
    it '200とデータが返ってくること' do
      params = { last_request_at: Time.zone.now }
      get '/api/places', params: params, headers: login_headers(user)

      expect(response.status).to eq 200
      json = [
        {
          id: place1.id,
          name: place1.name
        },
        {
          id: place2.id,
          name: place2.name
        }
      ].to_json
      expect(response.body).to be_json_eql(json)
    end
  end
end
