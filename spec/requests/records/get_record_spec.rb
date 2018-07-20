# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/record' do
  let!(:today) { Time.zone.today }
  let!(:yesterday) { Time.zone.yesterday }

  let!(:user) { create(:user) }
  let!(:category) { create(:category, user: user) }
  let!(:place) { create(:place, user: user) }
  let!(:breakdown) { create(:breakdown, category: category) }
  let!(:categorized_place) do
    create(:categorized_place, place: place, category: category)
  end
  let!(:tag1) { create(:tag, user: user) }
  let!(:tag2) { create(:tag, user: user) }

  let!(:record) do
    create(:record, user: user, published_at: today,
                    category: category, place: place,
                    breakdown: breakdown, currency: :dollar)
  end
  let!(:tagged_record1) do
    create(:tagged_record, record: record, tag: tag1)
  end
  let!(:tagged_record2) do
    create(:tagged_record, record: record, tag: tag2)
  end
  let!(:params) { { last_request_at: Time.zone.now } }

  context 'ログインしていなかった場合' do
    it '401とデータが返ってくること' do
      get "/api/records/#{record.id}"

      expect(response.status).to eq 401
      json = {
        error_message: I18n.t('messages.alert.authentication_error')
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'ログインしていた場合' do
    let(:params) { { last_request_at: Time.zone.now } }

    it '200とデータが返ってくること' do
      get "/api/records/#{record.id}",
          params: params, headers: login_headers(user)

      expect(response.status).to eq 200
      json = {
        id: record.id,
        balance_of_payments: record.category.balance_of_payments,
        breakdown_id: record.breakdown.id,
        breakdown_name: record.breakdown.name,
        category_id: record.category.id,
        category_name: record.category.name,
        charge: record.charge,
        human_charge: record.decorate.human_charge,
        memo: record.memo,
        place_id: record.place.id,
        place_name: record.place.name,
        point: 10,
        published_at: record.published_at,
        tagged_records: [
          {
            id: tagged_record1.id,
            tag_id: tag1.id,
            tag_name: tag1.name,
            tag_color_code: tag1.color_code
          },
          {
            id: tagged_record2.id,
            tag_id: tag2.id,
            tag_name: tag2.name,
            tag_color_code: tag2.color_code
          }
        ]
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end
end
