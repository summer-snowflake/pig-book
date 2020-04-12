# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/places', autodoc: true do
  let!(:user) { create(:user) }
  let!(:place1) { create(:place, user: user) }
  let!(:place2) { create(:place, user: user) }

  context 'when NOT logged in.' do
    it 'returns status code 401 and json errors data' do
      get '/api/places'

      expect(response.status).to eq 401
      json = {
        errors: ['アカウント登録もしくはログインしてください。']
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'when logged in.' do
    it 'returns status code 200 and json places data' do
      get '/api/places', headers: login_headers_with_login(user)

      expect(response.status).to eq 200
      json = [
        {
          user_id: user.id,
          name: place2.name,
          categories: []
        },
        {
          user_id: user.id,
          name: place1.name,
          categories: []
        }
      ].to_json
      expect(response.body).to be_json_eql(json)
    end
  end
end
