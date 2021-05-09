# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/dashboards', autodoc: true do
  let!(:user) { create(:user, :active, :with_profile) }
  let!(:year) { Time.zone.today.year }
  let(:path) { '/api/dashboards' }

  context 'when NOT logged in.' do
    before do
      get path
    end

    it_behaves_like 'set alert message of the authentication'
  end

  context 'when logged in.' do
    before do
      sign_in user
    end

    context 'there is tally event' do
      let!(:tally_event) { create(:tally_event, user: user, year: year) }

      it 'returns status code 200 and json dashboards data' do
        get path
        expect(response.status).to eq 200

        json = {
          year.to_s => {
            event: {
              user_id: user.id,
              year: year
            },
            monthly_total: [],
            yearly_total: {},
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
        get path
        expect(response.status).to eq 200

        json = {
          year.to_s => {
            event: nil,
            monthly_total: [],
            yearly_total: {},
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
