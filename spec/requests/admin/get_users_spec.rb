# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/admin/users', autodoc: true do
  let!(:inactive_user) { create(:user) }
  let!(:admin_user) { create(:user, :active, :admin) }
  let!(:user) { create(:user, :active) }
  let(:path) { '/api/admin/users' }

  context 'when NOT logged in.' do
    before do
      get path
    end

    it_behaves_like 'set alert message of the authentication'
  end

  context 'when NOT logged in.' do
    it 'set alert message' do
      get path, headers: login_headers_with_login(inactive_user), as: :json

      json = {
        errors: ['アカウント登録もしくはログインしてください。']
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'when NOT logged in as admin.' do
    it 'set alert message' do
      get path, headers: login_headers_with_login(user), as: :json

      json = {
        errors: ['操作が許可されているユーザでログインしてください。']
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'when logged in as admin user.' do
    let!(:category) { create(:category, user: user) }

    it 'returns status code 200 and json users data' do
      get path, headers: login_headers_with_login(admin_user), as: :json

      expect(response.status).to eq 200
      users = [
        {
          active: true,
          email: user.email,
          allow_password_change: false,
          image: user.image,
          name: user.name,
          nickname: user.nickname,
          provider: 'email',
          uid: user.email,
          current_sign_in_at: user.reload.current_sign_in_at,
          categories_count: 1,
          breakdowns_count: 0,
          places_count: 0,
          records_count: 0,
          tags_count: 0,
          daily_option: false,
          unlimited_option: false,
          piggy_bank_option: false,
          human_created_on: I18n.l(user.created_at, format: :date),
          human_current_sign_in_at: '',
          human_updated_at: I18n.l(user.updated_at)
        },
        {
          admin: {
            user_id: admin_user.id
          },
          active: true,
          email: admin_user.email,
          allow_password_change: false,
          image: admin_user.image,
          name: admin_user.name,
          nickname: admin_user.nickname,
          provider: 'email',
          uid: admin_user.email,
          current_sign_in_at: admin_user.reload.current_sign_in_at,
          categories_count: 0,
          breakdowns_count: 0,
          places_count: 0,
          records_count: 0,
          tags_count: 0,
          daily_option: false,
          unlimited_option: false,
          piggy_bank_option: false,
          human_created_on: I18n.l(admin_user.created_at, format: :date),
          human_current_sign_in_at: I18n.l(admin_user.reload.current_sign_in_at),
          human_updated_at: I18n.l(admin_user.updated_at)
        },
        {
          active: false,
          email: inactive_user.email,
          allow_password_change: false,
          image: inactive_user.image,
          name: inactive_user.name,
          nickname: inactive_user.nickname,
          provider: 'email',
          uid: inactive_user.email,
          current_sign_in_at: inactive_user.reload.current_sign_in_at,
          categories_count: 0,
          breakdowns_count: 0,
          places_count: 0,
          records_count: 0,
          tags_count: 0,
          daily_option: false,
          unlimited_option: false,
          piggy_bank_option: false,
          human_created_on: I18n.l(inactive_user.created_at, format: :date),
          human_current_sign_in_at: '',
          human_updated_at: I18n.l(inactive_user.updated_at)
        }
      ]
      json = {
        list: users,
        max_page: 1
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end
end
