# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/assets_accounts', autodoc: true do
  let!(:user) { create(:user, :active) }
  let!(:assets_account1) { create(:assets_account, user: user) }
  let!(:assets_account2) { create(:assets_account, user: user) }

  context 'when NOT logged in.' do
    it 'returns status code 401 and json errors data' do
      get '/api/assets_accounts'

      expect(response.status).to eq 401
      json = {
        errors: ['アカウント登録もしくはログインしてください。']
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'when logged in.' do
    it 'returns status code 200 and json assets_accounts data' do
      get '/api/assets_accounts', headers: login_headers_with_login(user)

      expect(response.status).to eq 200
      json = [
        {
          user_id: user.id,
          balance_of_payments: assets_account1.balance_of_payments,
          name: assets_account1.name,
          currency: assets_account1.currency,
          money: assets_account1.money,
          position: assets_account1.position,
          checked: true,
          from_now: assets_account1.from_now,
          human_charge: assets_account1.human_charge,
          human_updated_at: assets_account1.human_updated_at
        },
        {
          user_id: user.id,
          balance_of_payments: assets_account2.balance_of_payments,
          name: assets_account2.name,
          currency: assets_account2.currency,
          money: assets_account2.money,
          position: assets_account2.position,
          checked: true,
          from_now: assets_account2.from_now,
          human_charge: assets_account2.human_charge,
          human_updated_at: assets_account2.human_updated_at
        }
      ].to_json
      expect(response.body).to be_json_eql(json)
    end
  end
end
