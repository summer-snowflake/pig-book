# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/categories', autodoc: true do
  let!(:user) { create(:user, :active) }
  let!(:category) { create(:category, user: user) }
  let!(:breakdown) { create(:breakdown, user: user, category: category) }
  let!(:place1) { create(:place, user: user) }
  let!(:place2) { create(:place, user: user) }
  let!(:categorized) do
    create(:categorized_place, category: category, place: place2)
  end
  let(:path) { "/api/categories/#{category.id}" }

  context 'when NOT logged in.' do
    before do
      get path
    end

    it_behaves_like 'set alert message of the authentication'
  end

  context 'when logged in.' do
    before do
      sign_in user
    end

    it 'returns status code 200 and json category data' do
      get path
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
