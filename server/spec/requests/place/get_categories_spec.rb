# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/places/:place_id/categories' do
  let!(:user) { create(:user) }
  let!(:place) { create(:place, user: user) }
  let!(:category1) { create(:category, user: user) }
  let!(:category2) { create(:category, user: user) }
  let!(:categorized_place) do
    create(:categorized_place, category: category1, place: place)
  end

  context 'when NOT logged in.' do
    it 'returns status code 401 and json errors data.' do
      get "/api/places/#{place.id}/categories"

      expect(response.status).to eq 401
      json = {
        errors: ['アカウント登録もしくはログインしてください。']
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'when logged in.' do
    it 'returns status code 200 and json profile data.' do
      get "/api/places/#{place.id}/categories",
          headers: login_headers_with_login(user)

      expect(response.status).to eq 200
      json = [
        {
          name: category1.name,
          balance_of_payments: false,
          user_id: user.id
        }
      ].to_json
      expect(response.body).to be_json_eql(json)
    end
  end
end
