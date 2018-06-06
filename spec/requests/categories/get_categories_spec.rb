# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/categories' do
  let!(:user) { create(:user) }
  let!(:category1) { create(:category, user: user, balance_of_payments: false) }
  let!(:category2) { create(:category, user: user, balance_of_payments: true) }

  context 'ログインしていなかった場合' do
    it '401とデータが返ってくること' do
      get '/api/categories'

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
      get '/api/categories',
          params: params, headers: login_headers(user)

      expect(response.status).to eq 200
      json = [
        {
          id: category1.id,
          name: category1.name,
          balance_of_payments: false
        },
        {
          id: category2.id,
          name: category2.name,
          balance_of_payments: true
        }
      ].to_json
      expect(response.body).to be_json_eql(json)
    end
  end
end
