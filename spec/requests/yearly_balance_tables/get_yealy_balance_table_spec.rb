# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/yearly_balance_tables/:year' do
  let!(:user) { create(:user) }
  let!(:year) { Time.zone.today.year }

  context 'ログインしていなかった場合' do
    it '401とデータが返ってくること' do
      get '/api/yearly_balance_tables/2018'

      expect(response.status).to eq 401
      json = {
        error_message: I18n.t('messages.alert.authentication_error')
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'ログインしていた場合' do
    context 'データがある場合' do
      let!(:yearly_balance_table) do
        create(:yearly_balance_table,
               user: user, year: 2018, income: 3000, expenditure: 3400)
      end

      it '200とデータが返ってくること' do
        params = { last_request_at: Time.zone.now, date: Date.current.to_s }
        get '/api/yearly_balance_tables/2018',
            params: params, headers: login_headers(user)

        expect(response.status).to eq 200
        json = {
          human_total_income: '¥3,000',
          human_total_expenditure: '¥3,400'
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end

    context 'データがない場合' do
      it '200とデータが返ってくること' do
        params = { last_request_at: Time.zone.now, date: Date.current.to_s }
        get '/api/yearly_balance_tables/2018',
            params: params, headers: login_headers(user)

        expect(response.status).to eq 200
        json = {
          human_total_income: '¥0',
          human_total_expenditure: '¥0'
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end
  end
end
