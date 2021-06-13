# frozen_string_literal: true

require 'rails_helper'

describe 'PATCH /api/profile', autodoc: true do
  let!(:user) { create(:user, :active) }
  let(:path) { '/api/profile' }

  context 'when NOT logged in.' do
    before do
      patch path
    end

    it_behaves_like 'set alert message of the authentication'
  end

  context 'when logged in.' do
    let(:params) do
      {
        locale: 'en',
        currency: 'dollar'
      }
    end

    after do
      I18n.locale = :ja
    end

    it 'returns status code 200 and json profile data' do
      patch path, params: params, headers: login_headers_with_login(user), as: :json
      expect(response.status).to eq 200

      json = {
        user_id: user.id,
        locale: 'en',
        currency: 'dollar',
        memo: ''
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end
end
