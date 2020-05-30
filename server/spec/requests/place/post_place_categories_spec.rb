# frozen_string_literal: true

require 'rails_helper'

describe 'POST /api/places/:place_id/categories', autodoc: true do
  let!(:user) { create(:user, :active) }
  let!(:category1) { create(:category, user: user) }
  let!(:category2) { create(:category, user: user) }
  let!(:place) { create(:place, user: user) }
  let!(:categorized) do
    create(:categorized_place, category: category1, place: place)
  end

  context 'when NOT logged in.' do
    it 'returns status code 401 and json errors data' do
      post "/api/places/#{place.id}/categories"

      expect(response.status).to eq 401
      json = {
        errors: ['アカウント登録もしくはログインしてください。']
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'when logged in.' do
    context 'name is valid' do
      it 'returns status code 200 and json place categories data' do
        params = {
          category_ids: [category2.id]
        }.to_json
        post "/api/places/#{place.id}/categories",
             params: params, headers: login_headers_with_login(user)

        expect(response.status).to eq 200
        json = [
          id: category2.id,
          balance_of_payments: false,
          name: category2.name,
          user_id: user.id
        ].to_json
        expect(response.body).to be_json_eql(json)
      end
    end
  end
end
