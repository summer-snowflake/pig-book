# frozen_string_literal: true

require 'rails_helper'

describe 'DELETE /api/breakdowns/:id', autodoc: true do
  let!(:user) { create(:user, :active) }
  let!(:breakdown) { create(:breakdown, user: user) }
  let(:path) { "/api/breakdowns/#{breakdown.id}" }

  context 'when NOT logged in.' do
    before do
      delete path
    end

    it_behaves_like 'set alert message of the authentication'
  end

  context 'when logged in.' do
    it 'return status code 404 because delete twice' do
      delete path, headers: login_headers_with_login(user), as: :json
      expect(response.status).to eq 204

      delete path, headers: login_headers_with_login(user), as: :json
      expect(response.status).to eq 404
    end

    it 'returns status code 204' do
      delete path, headers: login_headers_with_login(user), as: :json
      expect(response.status).to eq 204
    end

    context 'when already be used by record' do
      let!(:record) { create(:record, user: user, breakdown: breakdown) }

      it 'returns status code 403 because it is already in use' do
        delete path, headers: login_headers_with_login(user), as: :json
        expect(response.status).to eq 403

        json = {
          errors: ['使用されているため削除できません。']
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end
  end
end
