# frozen_string_literal: true

require 'rails_helper'

describe 'PATCH /api/assets_accounts/:id', autodoc: true do
  let!(:user) { create(:user, :active) }
  let!(:assets_account) { create(:assets_account, user: user) }
  let(:path) { "/api/assets_accounts/#{assets_account.id}" }

  context 'when NOT logged in.' do
    before do
      patch path
    end

    it_behaves_like 'set alert message of the authentication'
  end

  context 'when logged in.' do
    context 'name is valid' do
      it 'returns status code 200 and json assets_account data' do
        params = {
          name: '△△銀行'
        }
        patch path, params: params, headers: login_headers_with_login(user), as: :json
        expect(response.status).to eq 200

        json = {
          user_id: user.id,
          name: '△△銀行',
          balance_of_payments: assets_account.balance_of_payments,
          currency: assets_account.currency,
          money: assets_account.money,
          position: assets_account.position,
          checked: true
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end
  end
end
