# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/piggy_items', autodoc: true do
  let!(:user) { create(:user, :active) }
  let!(:piggy_bank) { create(:piggy_bank, user: user, created_at: 2.hours.ago) }
  let!(:piggy_item1) { create(:piggy_item, user: user, piggy_bank: piggy_bank, name: '内訳1') }
  let!(:piggy_item2) { create(:piggy_item, user: user, piggy_bank: piggy_bank, name: '内訳2') }
  let!(:path) { "/api/piggy_banks/#{piggy_bank.id}/piggy_items" }

  context 'when NOT logged in.' do
    it 'returns status code 401 and json errors data' do
      get path

      expect(response.status).to eq 401
      json = {
        errors: ['アカウント登録もしくはログインしてください。']
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'when logged in.' do
    it 'returns status code 200 and json piggy_items data' do
      get path, headers: login_headers_with_login(user)

      expect(response.status).to eq 200
      json = [
        {
          user_id: user.id,
          piggy_bank_id: piggy_bank.id,
          balance_of_payments: piggy_item1.balance_of_payments,
          name: piggy_item1.name,
          charge: piggy_item1.charge,
          published_on: Time.zone.today
        },
        {
          user_id: user.id,
          piggy_bank_id: piggy_bank.id,
          balance_of_payments: piggy_item2.balance_of_payments,
          name: piggy_item2.name,
          charge: piggy_item2.charge,
          published_on: Time.zone.today
        }
      ].to_json
      expect(response.body).to be_json_eql(json)
    end
  end
end
