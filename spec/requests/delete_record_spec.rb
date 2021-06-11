# frozen_string_literal: true

require 'rails_helper'

describe 'DELETE /api/records/:id', autodoc: true do
  let!(:user) { create(:user, :active) }
  let!(:category) { create(:category, user: user) }
  let!(:breakdown) { create(:breakdown, user: user, category: category) }
  let!(:place) { create(:place, user: user) }
  let!(:record) do
    create(:record, user: user, category: category, breakdown: breakdown)
  end
  let(:path) { "/api/records/#{record.id}" }

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
