# frozen_string_literal: true

require 'rails_helper'

describe 'POST /api/import_histories/:import_history_id/create_tags' do
  let!(:user) { create(:user) }
  let!(:import_history) { create(:import_history, user: user) }

  context 'ログインしていなかった場合' do
    it '401とデータが返ってくること' do
      post "/api/import_histories/#{import_history.id}/create_tags"

      expect(response.status).to eq 401
      json = {
        error_message: I18n.t('messages.alert.authentication_error')
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'ログインしていた場合' do
    it '201が返ってくること' do
      params = {
        last_request_at: Time.zone.now
      }
      post "/api/import_histories/#{import_history.id}/create_tags",
           params: params, headers: login_headers(user)

      expect(response.status).to eq 201

      tags = ['医療費控除対象']
      expect(user.tags.pluck(:name)).to eq tags
    end
  end
end
