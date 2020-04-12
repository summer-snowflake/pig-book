# frozen_string_literal: true

require 'rails_helper'

describe 'POST /api/places', autodoc: true do
  let!(:user) { create(:user) }
  let!(:place) { create(:place, user: user) }

  context 'when NOT logged in.' do
    it 'returns status code 401 and json errors data' do
      post '/api/places'

      expect(response.status).to eq 401
      json = {
        errors: ['アカウント登録もしくはログインしてください。']
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'when logged in.' do
    context 'name is valid' do
      it 'returns status code 201 and json place data' do
        params = {
          name: '新しい場所'
        }.to_json
        post '/api/places',
             params: params, headers: login_headers_with_login(user)

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
        }.to_json
        post '/api/places',
             params: params, headers: login_headers_with_login(user)

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
        }.to_json
        post '/api/places',
             params: params, headers: login_headers_with_login(user)

        expect(response.status).to eq 422
        json = {
          errors: ['お店・施設を入力してください']
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end
  end
end
