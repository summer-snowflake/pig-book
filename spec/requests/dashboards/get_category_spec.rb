# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/dashboards/:dashboard_year/categories/:id', autodoc: true do
  let!(:user) { create(:user, :active, :with_profile) }
  let!(:category) { create(:category, user: user) }
  let!(:breakdown1) { create(:breakdown, user: user, category: category) }
  let!(:breakdown2) { create(:breakdown, user: user, category: category) }
  let!(:year) { Time.zone.today.year }
  let!(:yearly_breakdown_record1) do
    create(:yearly_breakdown_record, user: user, category: category, breakdown: breakdown1)
  end
  let!(:yearly_breakdown_record2) do
    create(:yearly_breakdown_record, user: user, category: category, breakdown: breakdown2)
  end

  context 'when NOT logged in.' do
    before do
      get "/api/dashboards/#{year}/categories/#{category.id}"
    end

    it_behaves_like 'set alert message of the authentication'
  end

  context 'when logged in.' do
    it 'returns status code 200 and json dashboard data' do
      get "/api/dashboards/#{year}/categories/#{category.id}", headers: login_headers_with_login(user), as: :json

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
        ],
        breakdowns: [
          {
            user_id: user.id,
            category_id: category.id,
            name: breakdown1.name
          },
          {
            user_id: user.id,
            category_id: category.id,
            name: breakdown2.name
          }
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
        get "/api/dashboards/#{year}/categories/#{category.id}", headers: login_headers_with_login(user), as: :json

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
          ],
          breakdowns: [
            {
              user_id: user.id,
              category_id: category.id,
              name: breakdown1.name
            },
            {
              user_id: user.id,
              category_id: category.id,
              name: breakdown2.name
            }
          ]
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end
  end
end
