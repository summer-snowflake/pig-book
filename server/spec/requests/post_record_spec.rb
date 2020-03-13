# frozen_string_literal: true

require 'rails_helper'

describe 'POST /api/records' do
  let!(:user) { create(:user) }
  let!(:category) { create(:category, user: user) }
  let!(:breakdown) { create(:breakdown, user: user, category: category) }
  let!(:place) { create(:place, user: user) }

  context 'when NOT logged in.' do
    it 'returns status code 401 and json errors data.' do
      post '/api/records'

      expect(response.status).to eq 401
      json = {
        errors: ['アカウント登録もしくはログインしてください。']
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'when logged in.' do
    context 'valid parameters' do
      let!(:published_at) { Time.zone.now }
      let(:params) do
        {
          published_at: published_at,
          charge: 800,
          category_id: category.id,
          breakdown_id: breakdown.id,
          place_id: place.id,
          point: 50,
          currency: 'yen',
          memo: 'メモ'
        }.to_json
      end

      it 'returns status code 201 and json record data.' do
        post '/api/records', params: params,
                             headers: login_headers_with_login(user)

        expect(response.status).to eq 201
        json = {
          user_id: user.id,
          category_id: category.id,
          breakdown_id: breakdown.id,
          place_id: place.id,
          published_at: published_at,
          charge: '800.0',
          cashless_charge: 0,
          point: 50,
          currency: 'yen',
          memo: 'メモ'
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end

    context 'NO category' do
      let!(:published_at) { Time.zone.now }
      let(:params) do
        {
          published_at: published_at,
          charge: 800,
          category_id: nil,
          breakdown_id: breakdown.id,
          place_id: place.id,
          point: 50,
          currency: 'yen',
          memo: 'メモ'
        }.to_json
      end

      it 'returns status code 422 and json errors data.' do
        post '/api/records', params: params,
                             headers: login_headers_with_login(user)

        expect(response.status).to eq 422
        json = {
          errors: ['カテゴリを入力してください']
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end
  end
end
