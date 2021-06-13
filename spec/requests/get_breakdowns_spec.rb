# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/breakdowns', autodoc: true do
  let!(:user) { create(:user, :active) }
  let!(:category) { create(:category, user: user, balance_of_payments: true) }
  let!(:breakdown1) { create(:breakdown, user: user, category: category) }
  let!(:breakdown2) { create(:breakdown, user: user, category: category) }
  let(:path) { '/api/breakdowns' }

  context 'when NOT logged in.' do
    before do
      get path
    end

    it_behaves_like 'set alert message of the authentication'
  end

  context 'when logged in.' do
    it 'returns status code 200 and json breakdowns data' do
      get path, headers: login_headers_with_login(user), as: :json
      expect(response.status).to eq 200

      json = [
        {
          user_id: user.id,
          category_id: category.id,
          name: breakdown2.name,
          category: {
            user_id: user.id,
            name: category.name,
            balance_of_payments: category.balance_of_payments
          }
        },
        {
          user_id: user.id,
          category_id: category.id,
          name: breakdown1.name,
          category: {
            user_id: user.id,
            name: category.name,
            balance_of_payments: category.balance_of_payments
          }
        }
      ].to_json
      expect(response.body).to be_json_eql(json)
    end
  end
end
