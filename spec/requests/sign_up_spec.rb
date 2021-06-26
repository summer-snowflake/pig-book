# frozen_string_literal: true

require 'rails_helper'

describe 'POST /api/auth', autodoc: true do
  context 'when parameter is empty.' do
    it 'returns status code 422 and json errors data' do
      post '/api/auth'

      expect(response.status).to eq 422
      json = {
        errors: [
          'リクエストボディに適切なアカウント新規登録データを送信してください。'
        ],
        status: 'error',
        success: false
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'when parameter is valid from api url.' do
    let(:email) { 'new_account@example.com' }
    let(:password) { 'password' }
    let(:params) do
      {
        email: email,
        password: password
      }.to_json
    end

    context 'new account' do
      it 'returns status code 200 and json user data' do
        post '/api/auth', params: params, headers: headers
        expect(response.status).to eq 200

        token = User.last.confirmation_token

        # before confirmation
        post '/api/auth/sign_in', params: params, headers: headers
        expect(response.status).to eq 401

        get "/api/auth/confirmation?confirmation_token=#{token}"
        expect(response.status).to eq 302

        # after confirmation
        post '/api/auth/sign_in', params: params, headers: headers
        expect(response.status).to eq 200
      end
    end
  end

  context 'when parameter is valid.' do
    before do
      ActionMailer::Base.deliveries.clear
    end

    let(:email) { 'new_account@example.com' }
    let(:password) { 'password' }
    let(:params) do
      {
        email: email,
        password: password
      }.to_json
    end

    context 'new account' do
      it 'returns status code 200 and json user data' do
        post '/api/auth', params: params, headers: headers
        expect(response.status).to eq 200

        # before confirmation
        post '/api/auth/sign_in', params: params, headers: headers
        expect(response.status).to eq 401

        user = User.find_by(email: email)
        get user_confirmation_url(confirmation_token: user.confirmation_token)

        # after confirmation
        post '/api/auth/sign_in', params: params, headers: headers
        expect(response.status).to eq 200
      end

      context 'twice new account, but already sign up as user' do
        let!(:user) { create(:user, :active, email: email, password: password) }

        it 'returns status code 422 and json errors data' do
          post '/api/auth', params: params, headers: headers

          expect(response.status).to eq 422
        end
      end
    end
  end
end
