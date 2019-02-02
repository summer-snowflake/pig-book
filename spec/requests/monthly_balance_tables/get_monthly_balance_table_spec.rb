# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/monthly_balance_tables/:year' do
  let!(:user) { create(:user) }
  let!(:monthly_balance_table1) { create(:monthly_balance_table, user: user) }
  let!(:monthly_balance_table2) { create(:monthly_balance_table, user: user) }

  context 'ログインしていなかった場合' do
    it '401とデータが返ってくること' do
      get "/api/monthly_balance_tables/#{Time.zone.today.year}"

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
      get "/api/monthly_balance_tables/#{Time.zone.today.year}",
          params: params, headers: login_headers(user)

      expect(response.status).to eq 200
      json = [
        {
          year_and_month: monthly_balance_table1.year_and_month,
          income: monthly_balance_table1.income,
          human_income: monthly_balance_table1.decorate.human_income,
          expenditure: monthly_balance_table1.expenditure,
          human_month: I18n.l(Time.zone.now, format: :month),
          human_expenditure: monthly_balance_table1.decorate.human_expenditure,
          month: Time.zone.now.month,
          point: 0
        },
        {
          year_and_month: monthly_balance_table2.year_and_month,
          income: monthly_balance_table2.income,
          human_income: monthly_balance_table2.decorate.human_income,
          human_month: I18n.l(Time.zone.now, format: :month),
          expenditure: monthly_balance_table2.expenditure,
          human_expenditure: monthly_balance_table2.decorate.human_expenditure,
          month: Time.zone.now.month,
          point: 0
        }
      ].to_json
      expect(response.body).to be_json_eql(json)
    end
  end
end
