# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/records' do
  let!(:user) { create(:user) }
  let!(:category) { create(:category, user: user) }
  let!(:breakdown) { create(:breakdown, user: user, category: category) }
  let!(:place) { create(:place, user: user) }
  let!(:record1) do
    create(:record,
           user: user, category: category, breakdown: breakdown, place: place,
           published_at: 2.hours.ago)
  end
  let!(:record2) do
    create(:record,
           user: user, category: category, breakdown: breakdown, place: place,
           published_at: 1.hour.ago)
  end
  let!(:record3) do
    create(:record,
           user: user, category: category, breakdown: breakdown, place: place,
           published_at: Time.zone.yesterday)
  end

  context 'when NOT logged in.' do
    it 'returns status code 401 and json errors data.' do
      get '/api/records'

      expect(response.status).to eq 401
      json = {
        errors: ['アカウント登録もしくはログインしてください。']
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'when logged in.' do
    context 'without params' do
      it 'returns status code 200 and json records data.' do
        get '/api/records', headers: login_headers_with_login(user)

        expect(response.status).to eq 200
        json = {
          list: [
            {
              user_id: user.id,
              category_id: category.id,
              breakdown_id: breakdown.id,
              place_id: place.id,
              published_at: record2.published_at,
              charge: record2.charge,
              human_charge: record2.human_charge,
              rounded_charge: record2.rounded_charge,
              cashless_charge: record2.cashless_charge,
              point: record2.point,
              currency: record2.currency,
              memo: record2.memo,
              category: {
                balance_of_payments: category.balance_of_payments,
                name: category.name,
                user_id: user.id
              },
              breakdown: {
                category_id: category.id,
                name: breakdown.name,
                user_id: user.id
              },
              place: {
                name: place.name,
                user_id: user.id
              }
            },
            {
              user_id: user.id,
              category_id: category.id,
              breakdown_id: breakdown.id,
              place_id: place.id,
              published_at: record1.published_at,
              charge: record1.charge,
              human_charge: record1.human_charge,
              rounded_charge: record1.rounded_charge,
              cashless_charge: record1.cashless_charge,
              point: record1.point,
              currency: record1.currency,
              memo: record1.memo,
              category: {
                balance_of_payments: category.balance_of_payments,
                name: category.name,
                user_id: user.id
              },
              breakdown: {
                category_id: category.id,
                name: breakdown.name,
                user_id: user.id
              },
              place: {
                name: place.name,
                user_id: user.id
              }
            }
          ],
          max_page: 1
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end

    context 'with date params' do
      let(:params) do
        { date: Time.zone.yesterday.to_s }
      end

      it 'returns status code 200 and json records data.' do
        get '/api/records', params: params,
                            headers: login_headers_with_login(user)

        expect(response.status).to eq 200
        json = {
          list: [
            {
              user_id: user.id,
              category_id: category.id,
              breakdown_id: breakdown.id,
              place_id: place.id,
              published_at: record3.published_at,
              charge: record3.charge,
              human_charge: record3.human_charge,
              rounded_charge: record3.rounded_charge,
              cashless_charge: record3.cashless_charge,
              point: record3.point,
              currency: record3.currency,
              memo: record3.memo,
              category: {
                balance_of_payments: category.balance_of_payments,
                name: category.name,
                user_id: user.id
              },
              breakdown: {
                category_id: category.id,
                name: breakdown.name,
                user_id: user.id
              },
              place: {
                name: place.name,
                user_id: user.id
              }
            }
          ],
          max_page: 1
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end
  end
end
