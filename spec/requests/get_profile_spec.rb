# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/profile', autodoc: true do
  let!(:user) { create(:user, :active) }
  let(:path) { '/api/profile' }

  context 'when NOT logged in.' do
    before do
      get path
    end

    it_behaves_like 'set alert message of the authentication'
  end

  context 'when logged in.' do
    before do
      sign_in user
    end

    it 'returns status code 200 and json profile data' do
      get path
      expect(response.status).to eq 200

      json = {
        user_id: user.id,
        locale: 'ja',
        currency: 'yen',
        memo: ''
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end
end
