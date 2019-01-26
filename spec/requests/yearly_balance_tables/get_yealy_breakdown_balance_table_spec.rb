# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/yearly_balance_tables/:year/breakdown' do
  let!(:user) { create(:user) }
  let!(:year) { Time.zone.today.year }

  context 'ログインしていなかった場合' do
    it '401とデータが返ってくること' do
      get '/api/yearly_balance_tables/2018/breakdown'

      expect(response.status).to eq 401
      json = {
        error_message: I18n.t('messages.alert.authentication_error')
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'ログインしていた場合' do
    context 'データがある場合' do
      let!(:category1) { create(:category, user: user, name: '消耗品費') }
      let!(:breakdown1) do
        create(:breakdown, category: category1, name: '日用品')
      end
      let!(:category2) { create(:category, user: user, name: '食費') }
      let!(:breakdown2) do
        create(:breakdown, category: category2, name: '飲み物')
      end
      before do
        create(:yearly_breakdown_balance_table,
               user: user, category: category1, breakdown: breakdown1,
               year: 2018, charge: 5500)
        create(:yearly_breakdown_balance_table,
               user: user, category: category1, breakdown: breakdown1,
               year: 2019, charge: 2000)
        create(:yearly_breakdown_balance_table,
               user: user, category: category2, breakdown: breakdown2,
               year: 2018, charge: 3200)
      end

      it '200とデータが返ってくること' do
        params = { last_request_at: Time.zone.now,
                   year: 2018 }
        get '/api/yearly_balance_tables/2018/breakdown',
            params: params, headers: login_headers(user)

        expect(response.status).to eq 200
        json = {
          income: [],
          expenditure: [
            {
              category_name: '消耗品費',
              breakdown_name: '日用品',
              charge: 5500,
              human_charge: '¥5,500'
            },
            {
              category_name: '食費',
              breakdown_name: '飲み物',
              charge: 3200,
              human_charge: '¥3,200'
            }
          ]
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end

    context 'データがない場合' do
      it '200とデータが返ってくること' do
        params = { last_request_at: Time.zone.now, year: 2018 }
        get '/api/yearly_balance_tables/2018/breakdown',
            params: params, headers: login_headers(user)

        expect(response.status).to eq 200
        json = {
          income: [],
          expenditure: []
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end
  end
end
