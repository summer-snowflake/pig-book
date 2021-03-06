# frozen_string_literal: true

require 'rails_helper'

describe 'PATCH /api/tags', autodoc: true do
  let!(:user) { create(:user, :active) }
  let!(:tag) { create(:tag, user: user) }
  let(:path) { "/api/tags/#{tag.id}" }

  context 'when NOT logged in.' do
    before do
      patch path
    end

    it_behaves_like 'set alert message of the authentication'
  end

  context 'when logged in.' do
    context 'name is valid' do
      it 'returns status code 200 and json tag data' do
        params = {
          name: '編集したラベル',
          color_code: '#000000'
        }
        patch path, params: params, headers: login_headers_with_login(user), as: :json
        expect(response.status).to eq 200

        json = {
          user_id: user.id,
          name: '編集したラベル',
          color_code: '#000000'
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end
  end
end
