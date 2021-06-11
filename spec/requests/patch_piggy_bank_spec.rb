# frozen_string_literal: true

require 'rails_helper'

describe 'PATCH /api/piggy_banks', autodoc: true do
  let!(:user) { create(:user, :active) }
  let!(:piggy_bank) { create(:piggy_bank, user: user) }
  let(:path) { "/api/piggy_banks/#{piggy_bank.id}" }

  context 'when NOT logged in.' do
    before do
      patch path
    end

    it_behaves_like 'set alert message of the authentication'
  end

  context 'when logged in.' do
    context 'name is valid' do
      it 'returns status code 200 and json piggy_bank data' do
        params = {
          title: '編集したタイトル',
          description: '編集した説明',
          currency: 'yen'
        }
        patch path, params: params, headers: login_headers_with_login(user), as: :json
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
