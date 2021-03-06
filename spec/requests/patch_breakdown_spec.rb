# frozen_string_literal: true

require 'rails_helper'

describe 'PATCH /api/breakdowns', autodoc: true do
  let!(:user) { create(:user, :active) }
  let!(:category) { create(:category, user: user) }
  let!(:breakdown) { create(:breakdown, user: user, category: category) }
  let(:path) { "/api/breakdowns/#{breakdown.id}" }

  context 'when NOT logged in.' do
    before do
      patch path
    end

    it_behaves_like 'set alert message of the authentication'
  end

  context 'when logged in.' do
    context 'name is valid' do
      it 'returns status code 200 and json breakdown data' do
        params = {
          category_id: category.id,
          name: '編集した内訳'
        }
        patch path, params: params, headers: login_headers_with_login(user), as: :json
        expect(response.status).to eq 200

        json = {
          user_id: user.id,
          name: '編集した内訳',
          category_id: category.id,
          category: {
            user_id: user.id,
            name: category.name,
            balance_of_payments: category.balance_of_payments
          }
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end
  end
end
