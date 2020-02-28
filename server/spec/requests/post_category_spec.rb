# frozen_string_literal: true

require 'rails_helper'

describe 'POST /api/categories' do
  let!(:user) { create(:user) }

  context 'when NOT logged in.' do
    it 'returns status code 401 and json errors data.' do
      post '/api/categories'

      expect(response.status).to eq 401
      json = {
        errors: ['アカウント登録もしくはログインしてください。']
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'when logged in.' do
    it 'returns status code 201 and json profile data.' do
      params = {
        name: '新しいカテゴリ',
        balance_of_payments: true
      }.to_json
      post '/api/categories',
           params: params, headers: login_headers_with_login(user)

      expect(response.status).to eq 201
      json = {
        balance_of_payments: true,
        name: '新しいカテゴリ',
        user_id: user.id
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end
end
