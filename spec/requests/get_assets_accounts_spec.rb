# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/assets_accounts', autodoc: true do
  let!(:user) { create(:user, :active) }
  let!(:assets_account1) { create(:assets_account, user: user) }
  let!(:assets_account2) { create(:assets_account, user: user) }
  let(:path) { '/api/assets_accounts' }

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

    it 'returns status code 200 and json assets_accounts data' do
      get path
      expect(response.status).to eq 200

      json = [
        {
          user_id: user.id,
          balance_of_payments: assets_account1.balance_of_payments,
          name: assets_account1.name,
          currency: assets_account1.currency,
          money: assets_account1.money,
          position: assets_account1.position,
          checked: false
        },
        {
          user_id: user.id,
          balance_of_payments: assets_account2.balance_of_payments,
          name: assets_account2.name,
          currency: assets_account2.currency,
          money: assets_account2.money,
          position: assets_account2.position,
          checked: false
        }
      ].to_json
      expect(response.body).to be_json_eql(json)
    end
  end
end
