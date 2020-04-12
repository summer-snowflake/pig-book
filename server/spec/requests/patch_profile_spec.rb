# frozen_string_literal: true

require 'rails_helper'

describe 'PATCH /api/profile', autodoc: true do
  let!(:user) { create(:user, :active) }

  after do
    I18n.locale = :ja
  end

  context 'when NOT logged in.' do
    it 'return status code 401 and json errors data' do
      patch '/api/profile'

      expect(response.status).to eq 401
      json = {
        errors: ['アカウント登録もしくはログインしてください。']
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'when logged in.' do
    let(:params) do
      {
        locale: 'en',
        currency: 'dollar'
      }.to_json
    end

    it 'returns status code 200 and json profile data' do
      patch '/api/profile',
            params: params, headers: login_headers_with_login(user)

      expect(response.status).to eq 200
      json = {
        user_id: user.id,
        locale: 'en',
        currency: 'dollar',
        memo: ''
      }.to_json
      expect(response.body).to be_json_eql(json)
    end

    it 'updates app locale.' do
      # Update locale to en.
      patch '/api/profile',
            params: params, headers: login_headers_with_login(user)

      # Return en error message.
      patch '/api/profile'

      json = {
        errors: ['You need to sign in or sign up before continuing.']
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end
end
