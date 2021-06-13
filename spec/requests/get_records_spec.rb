# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/records', autodoc: true do
  let!(:user) { create(:user, :active, :with_profile) }
  let!(:category) { create(:category, user: user) }
  let!(:breakdown) { create(:breakdown, user: user, category: category) }
  let!(:place) { create(:place, user: user) }
  let!(:record1) do
    create(:record,
           user: user, category: category, breakdown: breakdown, place: place,
           published_at: 1.minute.ago, charge: 3000)
  end
  let!(:record2) do
    create(:record,
           user: user, category: category, breakdown: breakdown, place: place,
           published_at: Time.zone.now, charge: 2000)
  end
  let!(:record3) do
    create(:record,
           user: user, category: category, breakdown: breakdown, place: place,
           published_at: Time.zone.yesterday, charge: 1000)
  end
  let!(:tag1) { create(:tag, user: user) }
  let!(:tag2) { create(:tag, user: user) }
  let!(:tagged_record1) { create(:tagged_record, tag: tag1, record: record2) }
  let!(:tagged_record2) { create(:tagged_record, tag: tag2, record: record2) }
  let(:path) { '/api/records' }

  context 'when NOT logged in.' do
    before do
      get path
    end

    it_behaves_like 'set alert message of the authentication'
  end

  context 'when logged in.' do
    context 'without params' do
      it 'returns status code 200 and json records data' do
        get path, headers: login_headers_with_login(user), as: :json
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
              },
              tags: [
                {
                  name: tag1.name,
                  color_code: tag1.color_code,
                  user_id: user.id
                },
                {
                  name: tag2.name,
                  color_code: tag2.color_code,
                  user_id: user.id
                }
              ]
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
              },
              tags: []
            }
          ],
          total_count: 2,
          max_page: 1,
          totals: {
            human_income_charge: '¥ 0',
            human_expenditure_charge: '¥ 5,000',
            human_all_charge: '¥ -5,000',
            use_cashless_charge: 0,
            use_point: 20
          }
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end

    context 'with date params' do
      let(:params) do
        { date: Time.zone.yesterday.to_s }
      end

      it 'returns status code 200 and json records data' do
        get path, params: params, headers: login_headers_with_login(user)
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
              },
              tags: []
            }
          ],
          total_count: 1,
          max_page: 1,
          totals: {
            human_income_charge: '¥ 0',
            human_expenditure_charge: '¥ 1,000',
            human_all_charge: '¥ -1,000',
            use_cashless_charge: 0,
            use_point: 10
          }

        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end
  end
end
