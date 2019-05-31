# frozen_string_literal: true

require 'rails_helper'

describe 'PATCH /api/breakdowns' do
  let!(:user) { create(:user) }
  let!(:category) { create(:category, user: user) }
  let!(:breakdown) { create(:breakdown, category: category) }

  context 'ログインしていなかった場合' do
    it '401とデータが返ってくること' do
      patch "/api/breakdowns/#{breakdown.id}"

      expect(response.status).to eq 401
      json = {
        error_message: I18n.t('messages.alert.authentication_error')
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'ログインしていた場合' do
    it '200が返ってくること' do
      params = {
        last_request_at: Time.zone.now,
        category_id: category.id,
        name: '編集した内訳'
      }
      patch "/api/breakdowns/#{breakdown.id}",
            params: params, headers: login_headers(user)

      expect(response.status).to eq 200
      json = {
        name: '編集した内訳',
        category_id: category.id,
        category_human_balance_of_payments: '支出',
        category_name: category.name,
        category_success_or_danger_style_class: \
          category.decorate.success_or_danger_style_class
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end
end
