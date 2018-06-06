# frozen_string_literal: true

require 'rails_helper'

describe 'DELETE /api/places/:id' do
  let!(:user) { create(:user) }
  let!(:place1) { create(:place, user: user) }
  let!(:place2) { create(:place, user: user) }

  context 'ログインしていなかった場合' do
    it '401とデータが返ってくること' do
      delete "/api/places/#{place1.id}"

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
      delete "/api/places/#{place1.id}",
             params: params, headers: login_headers(user)

      expect(response.status).to eq 200
    end
  end
end
