# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/categories' do
  let!(:user) { create(:user) }
  let!(:category) { create(:category, user: user) }
  let!(:breakdown) { create(:breakdown, user: user, category: category) }
  let!(:place1) { create(:place, user: user) }
  let!(:place2) { create(:place, user: user) }
  let!(:categorized) do
    create(:categorized_place, category: category, place: place2)
  end

  context 'when NOT logged in.' do
    it 'returns status code 401 and json errors data.' do
      get "/api/categories/#{category.id}"

      expect(response.status).to eq 401
      json = {
        errors: ['アカウント登録もしくはログインしてください。']
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'when logged in.' do
    it 'returns status code 200 and json profile data.' do
      get "/api/categories/#{category.id}",
          headers: login_headers_with_login(user)

      expect(response.status).to eq 200
      json = {
        name: category.name,
        balance_of_payments: category.balance_of_payments,
        user_id: user.id,
        breakdowns: [
          {
            user_id: user.id,
            category_id: category.id,
            name: breakdown.name
          }
        ],
        places: [
          {
            user_id: user.id,
            name: place2.name
          }
        ]
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end
end
