# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/tags', autodoc: true do
  let!(:user) { create(:user, :active) }
  let!(:tag1) { create(:tag, user: user) }
  let!(:tag2) { create(:tag, user: user) }

  context 'when NOT logged in.' do
    it 'returns status code 401 and json errors data' do
      get '/api/tags'

      expect(response.status).to eq 401
      json = {
        errors: ['アカウント登録もしくはログインしてください。']
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'when logged in.' do
    it 'returns status code 200 and json tags data' do
      get '/api/tags', headers: login_headers_with_login(user)

      expect(response.status).to eq 200
      json = [
        {
          user_id: user.id,
          name: tag2.name,
          color_code: tag2.color_code
        },
        {
          user_id: user.id,
          name: tag1.name,
          color_code: tag1.color_code
        }
      ].to_json
      expect(response.body).to be_json_eql(json)
    end
  end
end
