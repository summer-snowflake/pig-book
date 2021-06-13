# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/places/:place_id/categories', autodoc: true do
  let!(:user) { create(:user, :active) }
  let!(:place) { create(:place, user: user) }
  let!(:category1) { create(:category, user: user) }
  let!(:category2) { create(:category, user: user) }
  let!(:categorized_place) do
    create(:categorized_place, category: category1, place: place)
  end
  let(:path) { "/api/places/#{place.id}/categories" }

  context 'when NOT logged in.' do
    before do
      get path
    end

    it_behaves_like 'set alert message of the authentication'
  end

  context 'when logged in.' do
    it 'returns status code 200 and json place categories data' do
      get path, headers: login_headers_with_login(user), as: :json
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
