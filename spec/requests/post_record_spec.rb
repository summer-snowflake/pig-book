# frozen_string_literal: true

require 'rails_helper'

describe 'POST /api/records', autodoc: true do
  let!(:user) { create(:user, :active) }
  let!(:category) { create(:category, user: user) }
  let!(:breakdown) { create(:breakdown, user: user, category: category) }
  let!(:place) { create(:place, user: user) }
  let(:path) { '/api/records' }

  context 'when NOT logged in.' do
    before do
      post path
    end

    it_behaves_like 'set alert message of the authentication'
  end

  context 'when logged in.' do
    let!(:published_at) { Time.zone.local(2021, 3, 3, 15, 0, 0) }

    before do
      sign_in user
    end

    context 'valid parameters' do
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
        }
      end

      it 'returns status code 201 and json record data' do
        post path, params: params
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
        }
      end

      it 'returns status code 422 and json errors data' do
        post path, params: params
        expect(response.status).to eq 422

        json = {
          errors: ['カテゴリを入力してください']
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end
  end
end
