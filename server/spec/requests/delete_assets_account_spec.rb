# frozen_string_literal: true

require 'rails_helper'

describe 'DELETE /api/assets_accounts/:id', autodoc: true do
  let!(:user) { create(:user, :active) }
  let!(:assets_account) { create(:assets_account, user: user) }

  context 'when NOT logged in.' do
    it 'returns status code 401 and json errors data' do
      delete "/api/assets_accounts/#{assets_account.id}"

      expect(response.status).to eq 401
      json = {
        errors: ['アカウント登録もしくはログインしてください。']
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'when logged in.' do
    it 'returns status code 204' do
      delete "/api/assets_accounts/#{assets_account.id}",
             headers: login_headers_with_login(user)

      expect(response.status).to eq 204
    end
  end

  context 'when twice delete it' do
    it 'returns status code 404' do
      delete "/api/assets_accounts/#{assets_account.id}",
             headers: login_headers_with_login(user)
      expect(response.status).to eq 204

      delete "/api/assets_accounts/#{assets_account.id}",
             headers: login_headers_with_login(user)
      expect(response.status).to eq 404
    end
  end
end
