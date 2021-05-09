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
  let(:path) { "/api/places/#{place.id}/categories" }

  context 'when NOT logged in.' do
    before do
      post path
    end

    it_behaves_like 'set alert message of the authentication'
  end

  context 'when logged in.' do
    before do
      sign_in user
    end

    context 'name is valid' do
      it 'returns status code 200 and json place categories data' do
        params = {
          category_ids: [category2.id]
        }
        post path, params: params, as: :json

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
