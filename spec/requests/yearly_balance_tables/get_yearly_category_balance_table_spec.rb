# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/yearly_balance_tables/:year/category' do
  let!(:user) { create(:user) }
  let!(:year) { Time.zone.today.year }

  context 'ログインしていなかった場合' do
    it '401とデータが返ってくること' do
      get '/api/yearly_balance_tables/2018/category'

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
      let!(:category2) { create(:category, user: user, name: '食費') }
      let!(:breakdown1) do
        create(:breakdown, category: category1, name: '日用品')
      end
      let!(:breakdown2) do
        create(:breakdown, category: category1, name: '備品')
      end
      let!(:breakdown3) do
        create(:breakdown, category: category2, name: '飲み物')
      end
      before do
        create(:yearly_category_balance_table,
               user: user, category: category1, year: 2018, charge: 5500)
        create(:yearly_category_balance_table,
               user: user, category: category2, year: 2018, charge: 3200)
        create(:yearly_category_balance_table,
               user: user, category: category1, year: 2019, charge: 2000)
        create(:yearly_category_balance_table,
               user: user, category: category2, year: 2019, charge: 3400)
        create(:yearly_breakdown_balance_table,
               user: user, category: category1, breakdown: breakdown1,
               year: 2018, charge: 5000)
        create(:yearly_breakdown_balance_table,
               user: user, category: category1, breakdown: breakdown2,
               year: 2018, charge: 500)
        create(:yearly_breakdown_balance_table,
               user: user, category: category2, breakdown: breakdown3,
               year: 2018, charge: 3200)
      end

      it '200とデータが返ってくること' do
        params = { last_request_at: Time.zone.now,
                   year: 2018 }
        get '/api/yearly_balance_tables/2018/category',
            params: params, headers: login_headers(user)

        expect(response.status).to eq 200
        json = {
          category: {
            income: [],
            expenditure: [
              {
                category_id: category1.id,
                category_name: '消耗品費',
                charge: 5500,
                human_charge: '¥5,500'
              },
              {
                category_id: category2.id,
                category_name: '食費',
                charge: 3200,
                human_charge: '¥3,200'
              }
            ]
          },
          breakdown: {
            income: [],
            expenditure: [
              {
                breakdown_name: '日用品',
                category_id: category1.id,
                category_name: '消耗品費',
                charge: 5000,
                human_charge: '¥5,000'
              },
              {
                breakdown_name: '備品',
                category_id: category1.id,
                category_name: '消耗品費',
                charge: 500,
                human_charge: '¥500'
              },
              {
                breakdown_name: '飲み物',
                category_id: category2.id,
                category_name: '食費',
                charge: 3200,
                human_charge: '¥3,200'
              }
            ]
          }
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end

    context 'データがない場合' do
      it '200とデータが返ってくること' do
        params = { last_request_at: Time.zone.now, year: 2018 }
        get '/api/yearly_balance_tables/2018/category',
            params: params, headers: login_headers(user)

        expect(response.status).to eq 200
        json = {
          category: {
            income: [],
            expenditure: []
          },
          breakdown: {
            income: [],
            expenditure: []
          }
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end
  end
end
