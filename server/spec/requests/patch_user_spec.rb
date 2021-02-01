# frozen_string_literal: true

require 'rails_helper'

describe 'PATCH /api/user', autodoc: true do
  let!(:user) { create(:user, :active) }

  context 'when NOT logged in.' do
    it 'return status code 401 and json errors data' do
      patch '/api/user'

      expect(response.status).to eq 401
      json = {
        errors: ['アカウント登録もしくはログインしてください。']
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'when logged in as not an administrator' do
    let(:params) do
      {
        daily_option: true
      }.to_json
    end

    after do
      I18n.locale = :ja
    end

    it 'returns status code 200 and json user data' do
      patch '/api/user',
            params: params, headers: login_headers_with_login(user)

      expect(response.status).to eq 422
      json = {
        errors: ['デイリーチャートは許可されていません']
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'when logged in as an administrator' do
    let(:user) { create(:user, :active, :admin) }

    let(:params) do
      {
        daily_option: true
      }.to_json
    end

    after do
      I18n.locale = :ja
    end

    it 'returns status code 200 and json user data' do
      patch '/api/user',
            params: params, headers: login_headers_with_login(user)

      expect(response.status).to eq 200
      json = {
        id: user.id,
        daily_option: true,
        unlimited_option: false,
        email: user.email,
        name: nil,
        nickname: nil,
        provider: 'email',
        uid: user.uid,
        image: nil,
        allow_password_change: false,
        breakdowns_count: 0,
        categories_count: 0,
        places_count: 0,
        records_count: 0,
        tags_count: 0,
        options_list: 'デイリーチャート',
        options: [
          {
            column: 'daily_option',
            name: 'デイリーチャート',
            value: true,
            description: I18n.t('label.options.daily_option')
          },
          {
            column: 'unlimited_option',
            name: '無制限利用',
            value: false,
            description: I18n.t('label.options.unlimited_option')
          }
        ],
        admin: {
          user_id: user.id
        },
        dashboard_years: [Time.zone.today.year]
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end
end
