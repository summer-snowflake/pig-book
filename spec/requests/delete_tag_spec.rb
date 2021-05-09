# frozen_string_literal: true

require 'rails_helper'

describe 'DELETE /api/tags/:id', autodoc: true do
  let!(:user) { create(:user, :active) }
  let!(:tag) { create(:tag, user: user) }
  let(:path) { "/api/tags/#{tag.id}" }

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
      let!(:record) { create(:record, user: user) }
      let!(:tagged_record) { create(:tagged_record, record: record, tag: tag) }

      it_behaves_like 'returns status code 403 because it is already in use'
    end
  end
end
