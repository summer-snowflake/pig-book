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
    before do
      sign_in user
    end

    it_behaves_like 'returns status code 404 because delete twice'

    it 'returns status code 204' do
      delete path
      expect(response.status).to eq 204
    end
  end
end
