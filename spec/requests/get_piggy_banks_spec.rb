# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/piggy_banks', autodoc: true do
  let!(:user) { create(:user, :active) }
  let!(:piggy_bank1) { create(:piggy_bank, user: user, created_at: 2.hours.ago) }
  let!(:piggy_bank2) { create(:piggy_bank, user: user, created_at: 1.hours.ago) }
  let(:path) { '/api/piggy_banks' }

  context 'when NOT logged in.' do
    before do
      get path
    end

    it_behaves_like 'set alert message of the authentication'
  end

  context 'when logged in.' do
    it 'returns status code 200 and json piggy_banks data' do
      get path, headers: login_headers_with_login(user), as: :json
      expect(response.status).to eq 200

      json = [
        {
          user_id: user.id,
          title: piggy_bank1.title,
          description: piggy_bank1.description,
          currency: piggy_bank1.currency
        },
        {
          user_id: user.id,
          title: piggy_bank2.title,
          description: piggy_bank2.description,
          currency: piggy_bank2.currency
        }
      ].to_json
      expect(response.body).to be_json_eql(json)
    end
  end
end
