# frozen_string_literal: true

require 'rails_helper'

describe 'PATCH /api/breakdowns' do
  let!(:user) { create(:user) }
  let!(:category) { create(:category, user: user) }
  let!(:breakdown) { create(:breakdown, user: user, category: category) }

  context 'when NOT logged in.' do
    it 'returns status code 401 and json errors data.' do
      patch "/api/breakdowns/#{breakdown.id}"

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
          category_id: category.id,
          name: '編集した内訳'
        }.to_json
        patch "/api/breakdowns/#{breakdown.id}",
              params: params, headers: login_headers_with_login(user)

        expect(response.status).to eq 200
        json = {
          user_id: user.id,
          name: '編集した内訳',
          category_id: category.id,
          category: {
            user_id: user.id,
            name: category.name,
            balance_of_payments: category.balance_of_payments
          }
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end
  end
end
