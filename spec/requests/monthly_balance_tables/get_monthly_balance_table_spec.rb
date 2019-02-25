# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/monthly_balance_tables/:year' do
  let!(:user) { create(:user) }
  let!(:monthly_balance_table1) do
    create(:monthly_balance_table, user: user, year: 2019, month: 5)
  end
  let!(:monthly_balance_table2) do
    create(:monthly_balance_table, user: user, year: 2019, month: 6)
  end
  let!(:monthly_balance_table3) do
    create(:monthly_balance_table, user: user, year: 2018, month: 5)
  end
  let!(:monthly_balance_table4) do
    create(:monthly_balance_table, user: user, year: 2018, month: 6)
  end

  context 'ログインしていなかった場合' do
    it '401とデータが返ってくること' do
      get '/api/monthly_balance_tables/2019'

      expect(response.status).to eq 401
      json = {
        error_message: I18n.t('messages.alert.authentication_error')
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'ログインしていた場合' do
    it '200とデータが返ってくること' do
      params = { last_request_at: Time.zone.now, date: Date.current.to_s }
      get '/api/monthly_balance_tables/2019',
          params: params, headers: login_headers(user)

      expect(response.status).to eq 200
      json = [
        {
          year_and_month: monthly_balance_table1.year_and_month,
          income: monthly_balance_table1.income,
          human_income: monthly_balance_table1.decorate.human_income,
          expenditure: monthly_balance_table1.expenditure,
          human_month: '05月',
          human_expenditure: monthly_balance_table1.decorate.human_expenditure,
          previous_year_income: monthly_balance_table3.income,
          previous_year_expenditure: monthly_balance_table3.expenditure,
          month: 5,
          point: 0
        },
        {
          year_and_month: monthly_balance_table2.year_and_month,
          income: monthly_balance_table2.income,
          human_income: monthly_balance_table2.decorate.human_income,
          human_month: '06月',
          expenditure: monthly_balance_table2.expenditure,
          human_expenditure: monthly_balance_table2.decorate.human_expenditure,
          previous_year_income: monthly_balance_table4.income,
          previous_year_expenditure: monthly_balance_table4.expenditure,
          month: 6,
          point: 0
        }
      ].to_json
      expect(response.body).to be_json_eql(json)
    end
  end
end
