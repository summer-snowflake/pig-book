# frozen_string_literal: true

require 'rails_helper'

describe 'PATCH /api/assets_accounts', autodoc: true do
  let!(:user) { create(:user, :active) }
  let!(:assets_account) { create(:assets_account, user: user) }

  context 'when NOT logged in.' do
    it 'returns status code 401 and json errors data' do
      patch "/api/assets_accounts/#{assets_account.id}"

      expect(response.status).to eq 401
      json = {
        errors: ['アカウント登録もしくはログインしてください。']
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'when logged in.' do
    context 'name is valid' do
      it 'returns status code 200 and json assets_account data' do
        params = {
          name: '△△銀行'
        }.to_json
        patch "/api/assets_accounts/#{assets_account.id}",
              params: params, headers: login_headers_with_login(user)

        expect(response.status).to eq 200
        json = {
          user_id: user.id,
          name: '△△銀行',
          balance_of_payments: assets_account.balance_of_payments,
          currency: assets_account.currency,
          money: assets_account.money,
          position: assets_account.position,
          checked: false
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end
  end
end
