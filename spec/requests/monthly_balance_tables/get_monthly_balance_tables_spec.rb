# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/monthly_balance_tables' do
  let!(:user) { create(:user) }

  context 'ログインしていなかった場合' do
    it '401とデータが返ってくること' do
      get '/api/monthly_balance_tables'

      expect(response.status).to eq 401
      json = {
        error_message: I18n.t('messages.alert.authentication_error')
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'ログインしていた場合' do
    context 'データがある場合' do
      let!(:monthly_balance_table1) do
        create(:monthly_balance_table, user: user, year: 2018, month: 7)
      end
      let!(:monthly_balance_table2) do
        create(:monthly_balance_table, user: user, year: 2018, month: 9)
      end
      let!(:monthly_balance_table3) do
        create(:monthly_balance_table, user: user, year: 2016, month: 2)
      end

      it '200とデータが返ってくること' do
        params = { last_request_at: Time.zone.now, date: Date.current.to_s }
        get '/api/monthly_balance_tables',
            params: params, headers: login_headers(user)

        expect(response.status).to eq 200
        json = [*(2016..Time.zone.today.year)].reverse.to_json
        expect(response.body).to be_json_eql(json)
      end
    end

    context 'データがない場合' do
      it '200とデータが返ってくること' do
        params = { last_request_at: Time.zone.now, date: Date.current.to_s }
        get '/api/monthly_balance_tables',
            params: params, headers: login_headers(user)

        expect(response.status).to eq 200
        json = [Time.zone.today.year].to_json
        expect(response.body).to be_json_eql(json)
      end
    end
  end
end
