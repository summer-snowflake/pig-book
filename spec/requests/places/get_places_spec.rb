# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/places' do
  let!(:user) { create(:user) }
  let!(:place1) { create(:place, user: user) }
  let!(:place2) { create(:place, user: user) }
  let!(:category) { create(:category, user: user) }
  let!(:categorized_place) do
    create(:categorized_place, place: place2, category: category)
  end

  context 'ログインしていなかった場合' do
    it '401とデータが返ってくること' do
      get '/api/places'

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
      get '/api/places', params: params, headers: login_headers(user)

      expect(response.status).to eq 200
      json = [
        {
          id: place2.id,
          name: place2.name,
          categories: [
            {
              balance_of_payments: false,
              human_balance_of_payments: '支出',
              name: category.name,
              success_or_danger_style_class: 'danger'
            }
          ]
        },
        {
          id: place1.id,
          name: place1.name,
          categories: []
        }
      ].to_json
      expect(response.body).to be_json_eql(json)
    end
  end
end
