# frozen_string_literal: true

require 'rails_helper'

describe 'POST /api/categories', autodoc: true do
  let!(:user) { create(:user, :active) }
  let!(:category) { create(:category, user: user) }

  context 'when NOT logged in.' do
    it 'returns status code 401 and json errors data' do
      post '/api/breakdowns'

      expect(response.status).to eq 401
      json = {
        errors: ['アカウント登録もしくはログインしてください。']
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'when logged in.' do
    context 'name is valid' do
      it 'returns status code 201 and json breakdown data' do
        params = {
          category_id: category.id,
          name: '新しい内訳'
        }.to_json
        post '/api/breakdowns',
             params: params, headers: login_headers_with_login(user)

        expect(response.status).to eq 201
        json = {
          name: '新しい内訳',
          user_id: user.id,
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

    context 'already has same breakdown name' do
      let!(:breakdown) do
        create(:breakdown, user: user, category: category, name: '同じ内訳')
      end

      it 'returns status code 422 and json errors data' do
        params = {
          category_id: category.id,
          name: '同じ内訳'
        }.to_json
        post '/api/breakdowns',
             params: params, headers: login_headers_with_login(user)

        expect(response.status).to eq 422
        json = {
          errors: ['内訳はすでに登録されています']
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end

    context 'breakdown name is empty' do
      it 'returns status code 422 and json errors data' do
        params = {
          category_id: category.id,
          name: ''
        }.to_json
        post '/api/breakdowns',
             params: params, headers: login_headers_with_login(user)

        expect(response.status).to eq 422
        json = {
          errors: ['内訳を入力してください']
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end
  end
end
