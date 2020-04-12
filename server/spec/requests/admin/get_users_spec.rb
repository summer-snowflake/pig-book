# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/categories', autodoc: true do
  let!(:user) { create(:user) }
  let!(:user2) { create(:user, :admin) }

  context 'when NOT logged in.' do
    it 'returns status code 401 and json errors data' do
      get '/api/admin/users'

      expect(response.status).to eq 401
      json = {
        errors: ['アカウント登録もしくはログインしてください。']
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'when NOT logged in as admin.' do
    it 'returns status code 401 and json errors data' do
      get '/api/admin/users', headers: login_headers_with_login(user)

      expect(response.status).to eq 401
      json = {
        errors: ['操作が許可されているユーザでログインしてください。']
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'when logged in.' do
    let!(:category) { create(:category, user: user) }

    it 'returns status code 200 and json users data' do
      get '/api/admin/users', headers: login_headers_with_login(user2)

      expect(response.status).to eq 200
      json = [
        {
          email: user.email,
          allow_password_change: false,
          image: user.image,
          name: user.name,
          nickname: user.nickname,
          provider: 'email',
          uid: user.email,
          current_sign_in_at: user.reload.current_sign_in_at,
          total: {
            category: 1,
            breakdown: 0,
            place: 0,
            record: 0
          }
        },
        {
          admin: {
            user_id: user2.id
          },
          email: user2.email,
          allow_password_change: false,
          image: user2.image,
          name: user2.name,
          nickname: user2.nickname,
          provider: 'email',
          uid: user2.email,
          current_sign_in_at: user2.reload.current_sign_in_at,
          total: {
            category: 0,
            breakdown: 0,
            place: 0,
            record: 0
          }
        }
      ].to_json
      expect(response.body).to be_json_eql(json)
    end
  end
end
