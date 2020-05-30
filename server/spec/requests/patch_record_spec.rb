# frozen_string_literal: true

require 'rails_helper'

describe 'PATCH /api/records/:id', autodoc: true do
  let!(:user) { create(:user, :active) }
  let!(:category1) { create(:category, user: user) }
  let!(:category2) { create(:category, user: user) }
  let!(:breakdown1) { create(:breakdown, user: user, category: category1) }
  let!(:breakdown2) { create(:breakdown, user: user, category: category2) }
  let!(:place) { create(:place, user: user) }
  let!(:record) do
    create(:record, user: user, category: category1, breakdown: breakdown1)
  end

  context 'when NOT logged in.' do
    it 'returns status code 401 and json errors data' do
      patch "/api/records/#{record.id}"

      expect(response.status).to eq 401
      json = {
        errors: ['アカウント登録もしくはログインしてください。']
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'when logged in.' do
    context 'params are valid' do
      let!(:published_at) { 3.days.ago }

      it 'returns status code 200 and json record data' do
        params = {
          published_at: published_at,
          category_id: category2.id,
          breakdown_id: breakdown2.id,
          place_id: place.id,
          charge: 300,
          cashless_charge: 30,
          point: 10,
          memo: '更新'
        }.to_json
        patch "/api/records/#{record.id}",
              params: params, headers: login_headers_with_login(user)

        expect(response.status).to eq 200
        json = {
          user_id: user.id,
          category_id: category2.id,
          breakdown_id: breakdown2.id,
          place_id: place.id,
          published_at: published_at,
          currency: record.currency,
          charge: '300.0',
          cashless_charge: 30,
          point: 10,
          memo: '更新'
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end
  end
end
