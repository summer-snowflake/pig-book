# frozen_string_literal: true

require 'rails_helper'

describe 'PATCH /api/records' do
  let!(:user) { create(:user) }
  let!(:category) { create(:category, user: user) }
  let!(:breakdown) { create(:breakdown, category: category) }
  let!(:place) { create(:place, user: user) }
  let!(:categorized_place) do
    create(:categorized_place, category: category, place: place)
  end
  let!(:record) { create(:record, user: user, category: category) }

  context 'ログインしていなかった場合' do
    it '401とデータが返ってくること' do
      patch "/api/records/#{record.id}"

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
        id: record.id,
        last_request_at: Time.zone.now,
        published_at: Time.zone.now,
        charge: 800,
        category_id: category.id,
        breakdown_id: breakdown.id,
        place_id: place.id,
        tags: {
          '0': { 'color_code': '#666666', 'name': '灰色ラベル' },
          '1': { 'color_code': '#ffffff', 'name': '白' },
          '2': { 'name': '新規作成ラベル' }
        }.to_json,
        point: 50,
        memo: 'メモ'
      }
      patch "/api/records/#{record.id}",
            params: params, headers: login_headers(user)

      expect(response.status).to eq 200
    end
  end
end
