# frozen_string_literal: true

require 'rails_helper'

describe 'PATCH /api/piggy_banks', autodoc: true do
  let!(:user) { create(:user, :active) }
  let!(:piggy_bank) { create(:piggy_bank, user: user) }

  context 'when NOT logged in.' do
    it 'returns status code 401 and json errors data' do
      patch "/api/piggy_banks/#{piggy_bank.id}"

      expect(response.status).to eq 401
      json = {
        errors: ['アカウント登録もしくはログインしてください。']
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'when logged in.' do
    context 'name is valid' do
      it 'returns status code 200 and json piggy_bank data' do
        params = {
          title: '編集したタイトル',
          description: '編集した説明',
          currency: 'yen'
        }.to_json
        patch "/api/piggy_banks/#{piggy_bank.id}",
              params: params, headers: login_headers_with_login(user)

        expect(response.status).to eq 200
        json = {
          user_id: user.id,
          title: '編集したタイトル',
          description: '編集した説明',
          currency: :yen
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end
  end
end
