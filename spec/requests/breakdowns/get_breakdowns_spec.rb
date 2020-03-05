# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/breakdowns' do
  let!(:user) { create(:user) }
  let!(:category) { create(:category, user: user, balance_of_payments: true) }
  let!(:breakdown1) { create(:breakdown, user: user, category: category) }
  let!(:breakdown2) { create(:breakdown, user: user, category: category) }

  context 'ログインしていなかった場合' do
    it '401とデータが返ってくること' do
      get '/api/breakdowns'

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
      get '/api/breakdowns',
          params: params, headers: login_headers(user)

      expect(response.status).to eq 200
      json = [
        {
          category_balance_of_payments: true,
          category_name: category.name,
          name: breakdown2.name
        },
        {
          category_balance_of_payments: true,
          category_name: category.name,
          name: breakdown1.name
        }
      ].to_json
      expect(response.body).to be_json_eql(json)
    end
  end
end
