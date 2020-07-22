# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/dashboards/:dashboard_year/categories/:id', autodoc: true do
  let!(:user) { create(:user, :active, :with_profile) }
  let!(:category) { create(:category, user: user) }
  let!(:breakdown1) { create(:breakdown, user: user, category: category) }
  let!(:breakdown2) { create(:breakdown, user: user, category: category) }
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
        monthly_breakdowns: [
          { month: 1 },
          { month: 2 },
          { month: 3 },
          { month: 4 },
          { month: 5 },
          { month: 6 },
          { month: 7 },
          { month: 8 },
          { month: 9 },
          { month: 10 },
          { month: 11 },
          { month: 12 }
        ]
      }.to_json
      expect(response.body).to be_json_eql(json)
    end

    context 'there are tally monthly data' do
      let!(:monthly_breakdown_balance_table1) do
        create(:monthly_breakdown_record, user: user, category: category, year: year, month: 12, breakdown: breakdown1)
      end
      let!(:monthly_breakdown_balance_table2) do
        create(:monthly_breakdown_record, user: user, category: category, year: year, month: 12, breakdown: breakdown2)
      end

      it 'returns status code 200 and json dashboard data' do
        get "/api/dashboards/#{year}/categories/#{category.id}", headers: login_headers_with_login(user)

        expect(response.status).to eq 200
        json = {
          monthly_breakdowns: [
            { month: 1 },
            { month: 2 },
            { month: 3 },
            { month: 4 },
            { month: 5 },
            { month: 6 },
            { month: 7 },
            { month: 8 },
            { month: 9 },
            { month: 10 },
            { month: 11 },
            {
              month: 12,
              "#{breakdown1.name}": monthly_breakdown_balance_table1.expenditure,
              "#{breakdown2.name}": monthly_breakdown_balance_table2.expenditure
            }
          ]
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end
  end
end
