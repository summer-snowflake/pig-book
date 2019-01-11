# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/monthly_balance_tables/:year/total' do
  let!(:user) { create(:user) }
  let!(:year) { Time.zone.today.year }

  context 'ログインしていなかった場合' do
    it '401とデータが返ってくること' do
      get '/api/monthly_balance_tables/2018/total'

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
        create(:monthly_balance_table,
               user: user, year: 2018, month: 7, income: 250, expenditure: 0)
      end
      let!(:monthly_balance_table2) do
        create(:monthly_balance_table,
               user: user,
               year: 2018, month: 9, income: 500, expenditure: 0)
      end
      let!(:monthly_balance_table3) do
        create(:monthly_balance_table,
               user: user,
               year: 2016, month: 2, income: 0, expenditure: 900)
      end
      let!(:monthly_balance_table4) do
        create(:monthly_balance_table,
               user: user,
               year: 2018, month: 11, income: 0, expenditure: 300)
      end

      it '200とデータが返ってくること' do
        params = { last_request_at: Time.zone.now, date: Date.current.to_s }
        get '/api/monthly_balance_tables/2018/total',
            params: params, headers: login_headers(user)

        expect(response.status).to eq 200
        json = {
          total_income: 750,
          total_expenditure: 300
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end

    context 'データがない場合' do
      it '200とデータが返ってくること' do
        params = { last_request_at: Time.zone.now, date: Date.current.to_s }
        get '/api/monthly_balance_tables/2018/total',
            params: params, headers: login_headers(user)

        expect(response.status).to eq 200
        json = {
          total_income: 0,
          total_expenditure: 0
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end
  end
end
