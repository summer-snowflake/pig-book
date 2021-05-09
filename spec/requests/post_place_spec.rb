# frozen_string_literal: true

require 'rails_helper'

describe 'POST /api/places', autodoc: true do
  let!(:user) { create(:user, :active) }
  let!(:place) { create(:place, user: user) }
  let(:path) { '/api/places' }

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
      it 'returns status code 201 and json place data' do
        params = {
          name: '新しい場所'
        }
        post path, params: params
        expect(response.status).to eq 201

        json = {
          name: '新しい場所',
          user_id: user.id
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end

    context 'already has same place name' do
      let!(:place) do
        create(:place, user: user, name: '同じ場所')
      end

      it 'returns status code 422 and json errors data' do
        params = {
          name: '同じ場所'
        }
        post path, params: params
        expect(response.status).to eq 422

        json = {
          errors: ['お店・施設はすでに登録されています']
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end

    context 'place name is empty' do
      it 'returns status code 422 and json errors data' do
        params = {
          name: ''
        }
        post path, params: params
        expect(response.status).to eq 422

        json = {
          errors: ['お店・施設を入力してください']
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end
  end
end
