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
      before do
        create(:yearly_category_balance_table,
               user: user, category: category1, year: 2018, charge: 2500)
        create(:yearly_category_balance_table,
               user: user, category: category2, year: 2018, charge: 3500)
        create(:yearly_category_balance_table,
               user: user, category: category1, year: 2019, charge: 2000)
        create(:yearly_category_balance_table,
               user: user, category: category2, year: 2019, charge: 3400)
        create(:yearly_all_balance_table,
               user: user, year: 2018, charge: 3400)
      end

      it '200とデータが返ってくること' do
        params = { last_request_at: Time.zone.now,
                   year: 2018 }
        get '/api/yearly_balance_tables/2018/category',
            params: params, headers: login_headers(user)

        expect(response.status).to eq 200
        json = {
          income: [],
          expenditure: [
            {
              category_name: '食費',
              charge: 3500,
              human_charge: '¥3,500'
            },
            {
              category_name: '消耗品費',
              charge: 2500,
              human_charge: '¥2,500'
            }
          ]
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
          income: [],
          expenditure: []
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end
  end
end
