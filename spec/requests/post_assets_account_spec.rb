# frozen_string_literal: true

require 'rails_helper'

describe 'POST /api/assets_accounts', autodoc: true do
  let!(:user) { create(:user, :active) }
  let!(:assets_account) { create(:assets_account, user: user) }
  let(:path) { '/api/assets_accounts' }

  context 'when NOT logged in.' do
    before do
      post path
    end

    it_behaves_like 'set alert message of the authentication'
  end

  context 'when logged in.' do
    context 'name is valid' do
      it 'returns status code 201 and json assets_account data' do
        params = {
          name: '○✕銀行',
          balance_of_payments: true,
          money: '40000',
          currency: 'yen',
          position: 1
        }
        post path, params: params, headers: login_headers_with_login(user), as: :json
        expect(response.status).to eq 201

        json = {
          name: '○✕銀行',
          balance_of_payments: true,
          currency: 'yen',
          money: 40_000,
          position: 1,
          user_id: user.id,
          checked: false
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end

    context 'already has same assets_account name' do
      let!(:assets_account) do
        create(:assets_account, user: user, name: '○✕銀行')
      end

      it 'returns status code 422 and json errors data' do
        params = {
          name: '○✕銀行',
          money: '20000'
        }
        post path, params: params, headers: login_headers_with_login(user), as: :json
        expect(response.status).to eq 422

        json = {
          errors: ['預金の種類はすでに登録されています']
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end

    context 'assets_account name is empty' do
      it 'returns status code 422 and json errors data' do
        params = {
          name: ''
        }
        post path, params: params, headers: login_headers_with_login(user), as: :json
        expect(response.status).to eq 422

        json = {
          errors: ['預金の種類を入力してください']
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end
  end
end
