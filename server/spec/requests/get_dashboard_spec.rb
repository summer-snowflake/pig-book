# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/dashboards/:year', autodoc: true do
  let!(:user) { create(:user, :active, :with_profile) }
  let!(:year) { Time.zone.today.year }

  context 'when NOT logged in.' do
    it 'returns status code 401 and json errors data' do
      get "/api/dashboards/#{year}"

      expect(response.status).to eq 401
      json = {
        errors: ['アカウント登録もしくはログインしてください。']
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'when logged in.' do
    context 'there is tally event' do
      let!(:tally_event) { create(:tally_event, user: user, year: year) }

      it 'returns status code 200 and json dashboard data' do
        get "/api/dashboards/#{year}", headers: login_headers_with_login(user)

        expect(response.status).to eq 200
        json = {
          event: {
            user_id: user.id,
            year: year
          },
          monthly: [],
          yearly: nil,
          year: year
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end

    context 'there are tally monthly data' do
      let!(:tally_event) { create(:tally_event, user: user, year: year) }
      let!(:monthly_balance_table) do
        create(:monthly_balance_table, user: user)
      end

      it 'returns status code 200 and json dashboard data' do
        get "/api/dashboards/#{year}", headers: login_headers_with_login(user)

        expect(response.status).to eq 200
        json = {
          event: {
            user_id: user.id,
            year: year
          },
          monthly: [
            user_id: user.id,
            year: monthly_balance_table.year,
            month: monthly_balance_table.month,
            expenditure: monthly_balance_table.expenditure,
            income: monthly_balance_table.income,
            currency: 'yen',
            cashless_charge: 0,
            point: 0
          ],
          yearly: nil,
          year: year
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end

    context 'there is NOT tally event' do
      it 'returns status code 200 and json dashboard data' do
        get "/api/dashboards/#{year}", headers: login_headers_with_login(user)

        expect(response.status).to eq 200
        json = {
          event: nil,
          monthly: [],
          yearly: nil,
          year: year
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end
  end
end
