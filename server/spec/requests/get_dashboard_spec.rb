# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/profile' do
  let!(:user) { create(:user, :active) }
  let!(:event) { create(:event, user: user) }
  let!(:year) { Time.zone.today.year }

  context 'when NOT logged in.' do
    it 'returns status code 401 and json errors data.' do
      get "/api/dashboard/#{year}"

      expect(response.status).to eq 401
      json = {
        errors: ['アカウント登録もしくはログインしてください。']
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'when logged in.' do
    context 'there is event' do
      it 'returns status code 200 and json profile data.' do
        get "/api/dashboard/#{year}", headers: login_headers_with_login(user)

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
end
