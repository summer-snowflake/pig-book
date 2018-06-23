# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/records' do
  let!(:today) { Time.zone.today }
  let!(:yesterday) { Time.zone.yesterday }

  let!(:user) { create(:user) }
  let!(:category) { create(:category, user: user) }
  let!(:place) { create(:place, user: user) }
  let!(:breakdown) { create(:breakdown, category: category) }
  let!(:categorized_place) do
    create(:categorized_place, place: place, category: category)
  end

  let!(:record1) do
    create(:record, user: user, published_at: today,
                    category: category, currency: :dollar)
  end
  let!(:record2) do
    create(:record, user: user, published_at: today,
                    category: category, place: place, currency: :yen)
  end
  let!(:record3) do
    create(:record, user: user, published_at: yesterday,
                    category: category, currency: :yen)
  end
  let!(:record4) do
    create(:record, user: user, published_at: 2.months.ago,
                    category: category, breakdown: breakdown, currency: :yen)
  end
  let!(:record5) do
    create(:record, user: user, published_at: 1.years.ago, currency: :yen)
  end
  let!(:params) { { last_request_at: Time.zone.now } }

  context 'ログインしていなかった場合' do
    it '401とデータが返ってくること' do
      get '/api/records'

      expect(response.status).to eq 401
      json = {
        error_message: I18n.t('messages.alert.authentication_error')
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'ログインしていた場合' do
    context '検索条件がない場合' do
      let(:params) { { last_request_at: Time.zone.now } }

      it '200とデータが返ってくること' do
        get '/api/records', params: params, headers: login_headers(user)

        expect(response.status).to eq 200
        json = [
          {
            id: record5.id,
            breakdown_id: record5.breakdown.id,
            breakdown_name: record5.breakdown.name,
            category_id: record5.category.id,
            category_name: record5.category.name,
            charge: record5.charge,
            human_charge: record5.decorate.human_charge,
            memo: record5.memo,
            place_id: record5.place.id,
            place_name: record5.place.name,
            published_at: record5.published_at
          },
          {
            id: record4.id,
            breakdown_id: record4.breakdown.id,
            breakdown_name: record4.breakdown.name,
            category_id: record4.category.id,
            category_name: record4.category.name,
            charge: record4.charge,
            human_charge: record4.decorate.human_charge,
            memo: record4.memo,
            place_id: record4.place.id,
            place_name: record4.place.name,
            published_at: record4.published_at
          },
          {
            id: record3.id,
            breakdown_id: record3.breakdown.id,
            breakdown_name: record3.breakdown.name,
            category_id: record3.category.id,
            category_name: record3.category.name,
            charge: record3.charge,
            human_charge: record3.decorate.human_charge,
            memo: record3.memo,
            place_id: record3.place.id,
            place_name: record3.place.name,
            published_at: record3.published_at
          },
          {
            id: record2.id,
            breakdown_id: record2.breakdown.id,
            breakdown_name: record2.breakdown.name,
            category_id: record2.category.id,
            category_name: record2.category.name,
            charge: record2.charge,
            human_charge: record2.decorate.human_charge,
            memo: record2.memo,
            place_id: record2.place.id,
            place_name: record2.place.name,
            published_at: record2.published_at
          },
          {
            id: record1.id,
            breakdown_id: record1.breakdown.id,
            breakdown_name: record1.breakdown.name,
            category_id: record1.category.id,
            category_name: record1.category.name,
            charge: record1.charge,
            human_charge: record1.decorate.human_charge,
            memo: record1.memo,
            place_id: record1.place.id,
            place_name: record1.place.name,
            published_at: record1.published_at
          }
        ].to_json
        expect(response.body).to be_json_eql(json)
      end
    end

    context '日付が指定されていた場合' do
      let(:params) do
        { last_request_at: Time.zone.now, date: Time.zone.now }
      end

      it '200とデータが返ってくること' do
        get '/api/records', params: params, headers: login_headers(user)

        expect(response.status).to eq 200
        json = [
          {
            id: record2.id,
            breakdown_id: record2.breakdown.id,
            breakdown_name: record2.breakdown.name,
            category_id: record2.category.id,
            category_name: record2.category.name,
            charge: record2.charge,
            human_charge: record2.decorate.human_charge,
            memo: record2.memo,
            place_id: record2.place.id,
            place_name: record2.place.name,
            published_at: record2.published_at
          },
          {
            id: record1.id,
            breakdown_id: record1.breakdown.id,
            breakdown_name: record1.breakdown.name,
            category_id: record1.category.id,
            category_name: record1.category.name,
            charge: record1.charge,
            human_charge: record1.decorate.human_charge,
            memo: record1.memo,
            place_id: record1.place.id,
            place_name: record1.place.name,
            published_at: record1.published_at
          }
        ].to_json
        expect(response.body).to be_json_eql(json)
      end
    end
  end
end
