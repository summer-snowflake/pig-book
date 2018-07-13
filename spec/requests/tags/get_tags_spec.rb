# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/tags' do
  let!(:user) { create(:user) }
  let!(:tag1) { create(:tag, user: user) }
  let!(:tag2) { create(:tag, user: user) }

  context 'ログインしていなかった場合' do
    it '401とデータが返ってくること' do
      get '/api/tags'

      expect(response.status).to eq 401
      json = {
        error_message: I18n.t('messages.alert.authentication_error')
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'ログインしていた場合' do
    it '200とデータが返ってくること' do
      params = { last_request_at: Time.zone.now }
      get '/api/tags', params: params, headers: login_headers(user)

      expect(response.status).to eq 200
      json = [
        {
          id: tag2.id,
          name: tag2.name,
          color_code: tag2.color_code
        },
        {
          id: tag1.id,
          name: tag1.name,
          color_code: tag1.color_code
        }
      ].to_json
      expect(response.body).to be_json_eql(json)
    end
  end
end
