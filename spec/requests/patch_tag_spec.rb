# frozen_string_literal: true

require 'rails_helper'

describe 'PATCH /api/tags', autodoc: true do
  let!(:user) { create(:user, :active) }
  let!(:tag) { create(:tag, user: user) }

  context 'when NOT logged in.' do
    it 'returns status code 401 and json errors data' do
      patch "/api/tags/#{tag.id}"

      expect(response.status).to eq 401
      json = {
        errors: ['アカウント登録もしくはログインしてください。']
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'when logged in.' do
    context 'name is valid' do
      it 'returns status code 200 and json tag data' do
        params = {
          name: '編集したラベル',
          color_code: '#000000'
        }.to_json
        patch "/api/tags/#{tag.id}",
              params: params, headers: login_headers_with_login(user)

        expect(response.status).to eq 200
        json = {
          user_id: user.id,
          name: '編集したラベル',
          color_code: '#000000'
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end
  end
end
