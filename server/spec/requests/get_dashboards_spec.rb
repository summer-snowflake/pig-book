# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/dashboards', autodoc: true do
  let!(:user) { create(:user, :active, :with_profile) }
  let!(:year) { Time.zone.today.year }

  context 'when NOT logged in.' do
    it 'returns status code 401 and json errors data' do
      get '/api/dashboards'

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

      it 'returns status code 200 and json dashboards data' do
        get '/api/dashboards', headers: login_headers_with_login(user)

        expect(response.status).to eq 200
        json = {
          year.to_s => {
            event: {
              user_id: user.id,
              year: year
            },
            monthly_total: [],
            year: year,
            yearly_category_income: [],
            yearly_category_expenditure: [],
            yearly_breakdown_income: [],
            yearly_breakdown_expenditure: []
          }
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end

    context 'there is NOT tally event' do
      it 'returns status code 200 and json dashboards data' do
        get '/api/dashboards', headers: login_headers_with_login(user)

        expect(response.status).to eq 200
        json = {
          year.to_s => {
            event: nil,
            monthly_total: [],
            year: year,
            yearly_category_income: [],
            yearly_category_expenditure: [],
            yearly_breakdown_income: [],
            yearly_breakdown_expenditure: []
          }
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end
  end
end
