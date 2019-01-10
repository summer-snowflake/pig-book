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

    context '登録されている集計対象のデータがある場合' do
      let!(:record1) do
        create(:record, user: user, published_at: Time.zone.local(2018, 2, 1))
      end
      let!(:record2) do
        create(:record, user: user, published_at: Time.zone.local(2018, 4, 4))
      end
      let!(:record3) do
        create(:record, user: user, published_at: Time.zone.local(2018, 11, 5))
      end
      let!(:record4) do
        create(:record, user: user, published_at: Time.zone.local(2017, 10, 1))
      end

      it '200とデータが返ってくること' do
        expect(user.monthly_balance_tables.count).to eq 0

        patch "/api/admin/users/#{user.id}/tally",
              params: params, headers: login_headers(admin_user)

        expect(response.status).to eq 200
        event = user.events.last
        json = {
          last_tally_at: event.updated_at
        }.to_json
        expect(response.body).to be_json_eql(json)
        expect(user.monthly_balance_tables.count).to eq 24
        expect(user.monthly_balance_tables.pluck(:year_and_month))
          .to eq ['2018-02', '2018-04', '2018-11', '2017-10',
                  '2017-01', '2017-02', '2017-03', '2017-04', '2017-05',
                  '2017-06', '2017-07', '2017-08', '2017-09', '2017-11',
                  '2017-12', '2018-01', '2018-03', '2018-05', '2018-06',
                  '2018-07', '2018-08', '2018-09', '2018-10', '2018-12']
      end
    end

    context '登録されている集計対象のデータがない場合' do
      it '200とデータが返ってくること' do
        patch "/api/admin/users/#{user.id}/tally",
              params: params, headers: login_headers(admin_user)

        expect(response.status).to eq 200
        event = user.events.last
        json = {
          last_tally_at: event.updated_at
        }.to_json
        expect(response.body).to be_json_eql(json)
        expect(user.monthly_balance_tables.count).to eq 0
      end
    end
  end
end
