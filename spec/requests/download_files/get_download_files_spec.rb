# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/download_files' do
  let!(:user) { create(:user) }
  let!(:download_file1) { create(:download_file, user: user) }
  let!(:download_file2) do
    create(:download_file, user: user, created_at: Time.zone.yesterday)
  end

  context 'ログインしていなかった場合' do
    it '401とデータが返ってくること' do
      get '/api/download_files'

      expect(response.status).to eq 401
      json = {
        error_message: I18n.t('messages.alert.authentication_error')
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'ログインしていた場合' do
    let(:params) { { last_request_at: Time.zone.now } }

    it '200とデータが返ってくること' do
      get '/api/download_files', params: params, headers: login_headers(user)

      expect(response.status).to eq 200

      json = [
        {
          expired_label: nil,
          path: download_file1.path,
          filename: download_file1.filename
        },
        {
          expired_label: '有効期限切れ',
          path: download_file2.path,
          filename: download_file2.filename
        }
      ].to_json
      expect(response.body).to be_json_eql(json)
    end
  end
end
