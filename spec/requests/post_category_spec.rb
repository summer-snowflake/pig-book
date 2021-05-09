# frozen_string_literal: true

require 'rails_helper'

describe 'POST /api/categories', autodoc: true do
  let!(:user) { create(:user, :active) }
  let(:path) { '/api/categories' }

  context 'when NOT logged in.' do
    before do
      post path
    end

    it_behaves_like 'set alert message of the authentication'
  end

  context 'when logged in.' do
    before do
      sign_in user
    end

    context 'name is valid' do
      it 'returns status code 201 and json category data' do
        params = {
          name: '新しいカテゴリ',
          balance_of_payments: true
        }
        post path, params: params
        expect(response.status).to eq 201

        json = {
          balance_of_payments: true,
          name: '新しいカテゴリ',
          user_id: user.id
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end

    context 'already has same category name' do
      let!(:category) { create(:category, :income, user: user, name: '同じカテゴリ') }

      it 'returns status code 422 and json errors data' do
        params = {
          name: '同じカテゴリ',
          balance_of_payments: true
        }
        post path, params: params
        expect(response.status).to eq 422

        json = {
          errors: ['カテゴリ名はすでに登録されています']
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end

    context 'category name is empty' do
      it 'returns status code 422 and json errors data' do
        params = {
          name: '',
          balance_of_payments: true
        }
        post path, params: params
        expect(response.status).to eq 422

        json = {
          errors: ['カテゴリ名を入力してください']
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end
  end
end
