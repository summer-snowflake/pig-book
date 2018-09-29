# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/recently_used' do
  let!(:user) { create(:user) }
  let!(:category1) { create(:category, user: user, balance_of_payments: false) }
  let!(:category2) { create(:category, user: user, balance_of_payments: true) }
  let!(:category3) { create(:category, user: user, balance_of_payments: true) }
  let!(:template) { create(:template, category: category1) }
  let!(:record1) { create(:record, user: user, category: category1) }
  let!(:record2) { create(:record, user: user, category: category2) }
  let!(:tagged_record) { create(:tagged_record, record: record1, tag: tag) }
  let!(:tag) { create(:tag, user: user) }

  context 'ログインしていなかった場合' do
    it '401とデータが返ってくること' do
      get '/api/recently_used'

      expect(response.status).to eq 401
      json = {
        error_message: I18n.t('messages.alert.authentication_error')
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'ログインしていた場合' do
    it '200とデータが返ってくること' do
      params = { last_request_at: Time.zone.now }
      get '/api/recently_used',
          params: params, headers: login_headers(user)

      expect(response.status).to eq 200
      json = {
        recently_used_categories: [
          {
            balance_of_payments: category2.balance_of_payments,
            human_balance_of_payments: '収入',
            success_or_danger_style_class: 'success',
            name: category2.name,
            breakdowns: [],
            places: [],
            templates: []
          },
          {
            balance_of_payments: category1.balance_of_payments,
            human_balance_of_payments: '支出',
            success_or_danger_style_class: 'danger',
            name: category1.name,
            breakdowns: [],
            places: [],
            templates: [
              {
                name: template.name,
                category_id: category1.id,
                category_balance_of_payments: category1.balance_of_payments,
                category_name: template.category.name,
                breakdown_id: template.breakdown.id,
                breakdown_name: template.breakdown.name,
                tag: template.tag,
                tag_id: template.tag&.id,
                charge: template.charge,
                memo: template.memo
              }
            ]
          }
        ],
        recently_used_templates: [
          {
            name: template.name,
            category_id: category1.id,
            category_balance_of_payments: category1.balance_of_payments,
            category_name: category1.name,
            breakdown_id: template.breakdown.id,
            breakdown_name: template.breakdown.name,
            tag: template.tag,
            tag_id: template.tag&.id,
            charge: template.charge,
            memo: template.memo
          }
        ],
        recently_used_tags: [
          {
            color_code: tag.color_code,
            name: tag.name
          }
        ]
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end
end
