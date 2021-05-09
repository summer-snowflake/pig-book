# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/admin/users', autodoc: true do
  let!(:inactive_user) { create(:user) }
  let!(:admin_user) { create(:user, :active, :admin) }
  let!(:user) { create(:user, :active) }
  let(:path) { '/api/admin/users' }

  context 'when NOT logged in.' do
    it 'set alert message' do
      get path

      expect(flash[:alert]).to eq 'アカウント登録もしくはログインしてください。'
    end
  end

  context 'when NOT logged in.' do
    before do
      sign_in inactive_user
    end

    it 'set alert message' do
      get path

      expect(flash[:alert]).to eq 'メールアドレスの本人確認が必要です。'
    end
  end

  context 'when NOT logged in as admin.' do
    before do
      sign_in user
    end

    it 'set alert message' do
      get path

      expect(flash[:alert]).to eq '操作が許可されているユーザでログインしてください。'
    end
  end

  context 'when logged in as admin user.' do
    before do
      sign_in admin_user
    end

    let!(:category) { create(:category, user: user) }

    it 'returns status code 200 and json users data' do
      get path

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
          tokens: nil
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
          tokens: nil
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
          tokens: nil
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
