# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/dashboards/:dashboard_year/categories/:id', autodoc: true do
  let!(:user) { create(:user, :active, :with_profile) }
  let!(:category) { create(:category, user: user) }
  let!(:year) { Time.zone.today.year }

  context 'when NOT logged in.' do
    it 'returns status code 401 and json errors data' do
      get "/api/dashboards/#{year}/categories/#{category.id}"

      expect(response.status).to eq 401
      json = {
        errors: ['アカウント登録もしくはログインしてください。']
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'when logged in.' do
    it 'returns status code 200 and json dashboard data' do
      get "/api/dashboards/#{year}/categories/#{category.id}", headers: login_headers_with_login(user)

      expect(response.status).to eq 200
      json = {
        monthly_category: []
      }.to_json
      expect(response.body).to be_json_eql(json)
    end

    context 'there are tally monthly data' do
      let!(:monthly_category_balance_table) do
        create(:monthly_category_record, user: user, category: category, year: year)
      end

      it 'returns status code 200 and json dashboard data' do
        get "/api/dashboards/#{year}/categories/#{category.id}", headers: login_headers_with_login(user)

        expect(response.status).to eq 200
        json = {
          monthly_category: [
            {
              user_id: user.id,
              category_id: category.id,
              year: Time.zone.today.year,
              month: Time.zone.today.month,
              cashless_charge: 0,
              point: 0,
              expenditure: monthly_category_balance_table.expenditure,
              income: monthly_category_balance_table.income,
              currency: user.profile.currency,
              breakdown_id: nil,
              label: nil
            }
          ]
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end
  end
end
