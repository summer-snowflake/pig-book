# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/recently_used_categories' do
  let!(:user) { create(:user) }
  let!(:category1) { create(:category, user: user, balance_of_payments: false) }
  let!(:category2) { create(:category, user: user, balance_of_payments: true) }
  let!(:category3) { create(:category, user: user, balance_of_payments: true) }
  let!(:record1) { create(:record, user: user, category: category1) }
  let!(:record2) { create(:record, user: user, category: category2) }

  context 'ログインしていなかった場合' do
    it '401とデータが返ってくること' do
      get '/api/recently_used_categories'

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
      get '/api/recently_used_categories',
          params: params, headers: login_headers(user)

      expect(response.status).to eq 200
      json = [
        {
          balance_of_payments: category2.balance_of_payments,
          human_balance_of_payments: '収入',
          name: category2.name,
          success_or_danger_style_class: 'success',
          breakdowns: [],
          places: [],
          templates: []
        },
        {
          balance_of_payments: category1.balance_of_payments,
          human_balance_of_payments: '支出',
          name: category1.name,
          success_or_danger_style_class: 'danger',
          breakdowns: [],
          places: [],
          templates: []
        }
      ].to_json
      expect(response.body).to be_json_eql(json)
    end
  end
end
