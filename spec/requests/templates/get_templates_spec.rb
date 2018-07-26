# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/templates' do
  let!(:user) { create(:user) }
  let!(:category) { create(:category, user: user, balance_of_payments: true) }
  let!(:breakdown) { create(:breakdown, category: category) }
  let!(:template1) do
    create(:template, category: category, breakdown: breakdown)
  end
  let!(:template2) { create(:template, category: category, breakdown: nil) }

  context 'ログインしていなかった場合' do
    it '401とデータが返ってくること' do
      get '/api/templates'

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
      get '/api/templates',
          params: params, headers: login_headers(user)

      expect(response.status).to eq 200
      json = [
        {
          category_name: category.name,
          breakdown_id: nil,
          breakdown_name: nil,
          tag_id: nil,
          tag_name: nil,
          tag_color_code: nil,
          name: template2.name,
          charge: template2.charge,
          memo: template2.memo
        },
        {
          category_name: category.name,
          breakdown_id: breakdown.id,
          breakdown_name: breakdown.name,
          tag_id: nil,
          tag_name: nil,
          tag_color_code: nil,
          name: template1.name,
          charge: template1.charge,
          memo: template1.memo
        }
      ].to_json
      expect(response.body).to be_json_eql(json)
    end
  end
end
