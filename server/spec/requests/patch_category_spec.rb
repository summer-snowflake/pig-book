# frozen_string_literal: true

require 'rails_helper'

describe 'PATCH /api/categories' do
  let!(:user) { create(:user) }
  let!(:category) { create(:category, user: user) }

  context 'when NOT logged in.' do
    it 'returns status code 401 and json errors data.' do
      patch "/api/categories/#{category.id}"

      expect(response.status).to eq 401
      json = {
        errors: ['アカウント登録もしくはログインしてください。']
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'when logged in.' do
    context 'name is valid' do
      it 'returns status code 201 and json category data.' do
        params = {
          name: '編集したカテゴリ',
          balance_of_payments: true
        }.to_json
        patch "/api/categories/#{category.id}",
              params: params, headers: login_headers_with_login(user)

        expect(response.status).to eq 200
        json = {
          user_id: user.id,
          name: '編集したカテゴリ',
          balance_of_payments: true,
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end
  end
end
