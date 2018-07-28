# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/admin/users/:user_id/tally' do
  let!(:user) { create(:user) }
  let!(:admin_user) { create(:user) }
  let!(:admin) { create(:admin, user: admin_user) }
  let!(:params) { { last_request_at: Time.zone.now } }

  context 'ログインしていなかった場合' do
    it '401とデータが返ってくること' do
      patch "/api/admin/users/#{user.id}/tally"

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
      patch "/api/admin/users/#{user.id}/tally",
            params: params, headers: login_headers(admin_user)

      expect(response.status).to eq 200
      event = user.events.last
      json = {
        last_tally_at: event.updated_at
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end
end
