# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/categories' do
  let!(:user) { create(:user) }
  let!(:category1) { create(:category, user: user, balance_of_payments: false) }
  let!(:category2) { create(:category, user: user, balance_of_payments: true) }
  let!(:place) { create(:place, user: user) }
  let!(:categorized_place) do
    create(:categorized_place, place: place, category: category2)
  end
  let!(:breakdown1) { create(:breakdown, category: category1) }
  let!(:breakdown2) { create(:breakdown, category: category1) }

  context 'ログインしていなかった場合' do
    it '401とデータが返ってくること' do
      get '/api/categories'

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
      get '/api/categories',
          params: params, headers: login_headers(user)

      expect(response.status).to eq 200
      json = [
        {
          balance_of_payments: true,
          human_balance_of_payments: '収入',
          name: category2.name,
          success_or_danger_style_class: 'success',
          places: [{
            name: place.name
          }],
          breakdowns: [],
          templates: []
        },
        {
          balance_of_payments: false,
          human_balance_of_payments: '支出',
          name: category1.name,
          success_or_danger_style_class: 'danger',
          places: [],
          breakdowns: [
            {
              category_name: category1.name,
              name: breakdown1.name
            },
            {
              category_name: category1.name,
              name: breakdown2.name
            }
          ],
          templates: []
        }
      ].to_json
      expect(response.body).to be_json_eql(json)
    end
  end
end
