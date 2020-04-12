# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/categories', autodoc: true do
  let!(:user) { create(:user) }
  let!(:category1) { create(:category, user: user, balance_of_payments: false) }
  let!(:category2) { create(:category, user: user, balance_of_payments: true) }

  context 'when NOT logged in.' do
    it 'returns status code 401 and json errors data' do
      get '/api/categories'

      expect(response.status).to eq 401
      json = {
        errors: ['アカウント登録もしくはログインしてください。']
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'when logged in.' do
    it 'returns status code 200 and json categories data' do
      get '/api/categories', headers: login_headers_with_login(user)

      expect(response.status).to eq 200
      json = [
        {
          name: category2.name,
          balance_of_payments: true,
          user_id: user.id
        },
        {
          name: category1.name,
          balance_of_payments: false,
          user_id: user.id
        }
      ].to_json
      expect(response.body).to be_json_eql(json)
    end
  end
end
