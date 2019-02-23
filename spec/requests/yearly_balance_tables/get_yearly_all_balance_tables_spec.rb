# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/yearly_balance_tables' do
  let!(:user) { create(:user) }
  let!(:year) { Time.zone.today.year }

  context 'ログインしていなかった場合' do
    it '401とデータが返ってくること' do
      get '/api/yearly_balance_tables'

      expect(response.status).to eq 401
      json = {
        error_message: I18n.t('messages.alert.authentication_error')
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'ログインしていた場合' do
    context 'データがある場合' do
      before do
        create(:yearly_all_balance_table,
               user: user, year: 2018, income: 8000, expenditure: 9900)
        create(:yearly_all_balance_table,
               user: user, year: 2019, income: 4000, expenditure: 0)
      end

      it '200とデータが返ってくること' do
        params = { last_request_at: Time.zone.now }
        get '/api/yearly_balance_tables',
            params: params, headers: login_headers(user)

        expect(response.status).to eq 200
        json = [
          {
            year: 2018,
            income: 8000,
            human_income: '¥8,000',
            expenditure: 9900,
            human_expenditure: '¥9,900'
          },
          {
            year: 2019,
            income: 4000,
            human_income: '¥4,000',
            expenditure: 0,
            human_expenditure: '¥0'
          }
        ].to_json
        expect(response.body).to be_json_eql(json)
      end
    end

    context 'データがない場合' do
      it '200とデータが返ってくること' do
        params = { last_request_at: Time.zone.now }
        get '/api/yearly_balance_tables',
            params: params, headers: login_headers(user)

        expect(response.status).to eq 200
        json = [].to_json
        expect(response.body).to be_json_eql(json)
      end
    end
  end
end
