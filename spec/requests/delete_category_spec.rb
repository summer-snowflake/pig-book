# frozen_string_literal: true

require 'rails_helper'

describe 'DELETE /api/categories/:id', autodoc: true do
  let!(:user) { create(:user, :active) }
  let!(:category) { create(:category, user: user) }
  let(:path) { "/api/categories/#{category.id}" }

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

    context 'when already be used by record' do
      let!(:record) { create(:record, user: user, category: category) }

      it_behaves_like 'returns status code 403 because it is already in use'
    end
  end
end
