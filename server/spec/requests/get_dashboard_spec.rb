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
          monthly_total: [],
          yearly_total: nil,
          year: year,
          yearly_category_income: [],
          yearly_category_expenditure: [],
          yearly_breakdown_income: [],
          yearly_breakdown_expenditure: [],
          categories: []
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end

    context 'there are tally monthly data' do
      let!(:tally_event) { create(:tally_event, user: user, year: year) }
      let!(:monthly_balance_table) { create(:monthly_record, user: user) }
      let!(:category) { create(:category, user: user) }
      let!(:yearly_category_record) do
        create(:yearly_category_record, user: user, category: category, year: year, income: 0)
      end

      it 'returns status code 200 and json dashboard data' do
        get "/api/dashboards/#{year}", headers: login_headers_with_login(user)

        expect(response.status).to eq 200
        json = {
          event: {
            user_id: user.id,
            year: year
          },
          monthly_total: [
            user_id: user.id,
            category_id: nil,
            breakdown_id: nil,
            year: monthly_balance_table.year,
            month: monthly_balance_table.month,
            expenditure: monthly_balance_table.expenditure,
            income: monthly_balance_table.income,
            currency: 'yen',
            cashless_charge: 0,
            point: 0,
            label: nil
          ],
          yearly_total: nil,
          year: year,
          yearly_category_income: [],
          yearly_category_expenditure: [
            {
              user_id: yearly_category_record.user_id,
              category_id: yearly_category_record.category_id,
              breakdown_id: yearly_category_record.breakdown_id,
              year: yearly_category_record.year,
              label: yearly_category_record.label,
              currency: yearly_category_record.currency,
              cashless_charge: yearly_category_record.cashless_charge,
              expenditure: yearly_category_record.expenditure,
              income: yearly_category_record.income,
              point: yearly_category_record.point
            }
          ],
          yearly_breakdown_income: [],
          yearly_breakdown_expenditure: [],
          categories: [
            {
              id: category.id,
              user_id: category.user_id,
              name: category.name,
              balance_of_payments: category.balance_of_payments
            }
          ]
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end

    context 'there are tally monthly and yearly data' do
      let!(:tally_event) { create(:tally_event, user: user, year: year) }
      let!(:monthly_balance_table) { create(:monthly_record, user: user) }
      let!(:yearly_balance_table) { create(:yearly_record, user: user) }

      it 'returns status code 200 and json dashboard data' do
        get "/api/dashboards/#{year}", headers: login_headers_with_login(user)

        expect(response.status).to eq 200
        json = {
          event: {
            user_id: user.id,
            year: year
          },
          monthly_total: [
            user_id: user.id,
            category_id: nil,
            breakdown_id: nil,
            year: monthly_balance_table.year,
            month: monthly_balance_table.month,
            expenditure: monthly_balance_table.expenditure,
            income: monthly_balance_table.income,
            currency: 'yen',
            cashless_charge: 0,
            point: 0,
            label: nil
          ],
          yearly_total: {
            user_id: user.id,
            category_id: nil,
            breakdown_id: nil,
            year: yearly_balance_table.year,
            expenditure: yearly_balance_table.expenditure,
            income: yearly_balance_table.income,
            currency: 'yen',
            cashless_charge: 0,
            point: 0,
            label: nil
          },
          year: year,
          yearly_category_income: [],
          yearly_category_expenditure: [],
          yearly_breakdown_income: [],
          yearly_breakdown_expenditure: [],
          categories: []
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
          monthly_total: [],
          yearly_total: nil,
          year: year,
          yearly_category_income: [],
          yearly_category_expenditure: [],
          yearly_breakdown_income: [],
          yearly_breakdown_expenditure: [],
          categories: []
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end
  end
end
