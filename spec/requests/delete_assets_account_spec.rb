# frozen_string_literal: true

require 'rails_helper'

describe 'DELETE /api/assets_accounts/:id', autodoc: true do
  let!(:user) { create(:user, :active) }
  let!(:assets_account) { create(:assets_account, user: user) }
  let(:path) { "/api/assets_accounts/#{assets_account.id}" }

  context 'when NOT logged in.' do
    before do
      delete path
    end

    it_behaves_like 'set alert message of the authentication'
  end

  context 'when logged in.' do
    it 'returns status code 404 because delete twice' do
      delete path, headers: login_headers_with_login(user), as: :json
      expect(response.status).to eq 204

      delete path, headers: login_headers_with_login(user), as: :json
      expect(response.status).to eq 404
    end

    it 'returns status code 204' do
      delete path, headers: login_headers_with_login(user), as: :json
      expect(response.status).to eq 204
    end
  end
end
