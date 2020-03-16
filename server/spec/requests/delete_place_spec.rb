# frozen_string_literal: true

require 'rails_helper'

describe 'DELETE /api/places/:id' do
  let!(:user) { create(:user) }
  let!(:place) { create(:place, user: user) }

  context 'when NOT logged in.' do
    it 'returns status code 401 and json errors data.' do
      delete "/api/places/#{place.id}"

      expect(response.status).to eq 401
      json = {
        errors: ['アカウント登録もしくはログインしてください。']
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'when logged in.' do
    it 'returns status code 204.' do
      delete "/api/places/#{place.id}",
             headers: login_headers_with_login(user)

      expect(response.status).to eq 204
    end
  end

  context 'when twice delete it' do
    it 'returns status code 404.' do
      delete "/api/places/#{place.id}",
             headers: login_headers_with_login(user)
      expect(response.status).to eq 204

      delete "/api/places/#{place.id}",
             headers: login_headers_with_login(user)
      expect(response.status).to eq 404
    end
  end

  context 'when already be used by breakdown' do
    let!(:record) { create(:record, user: user, place: place) }

    it 'returns status code 403.' do
      delete "/api/places/#{place.id}",
             headers: login_headers_with_login(user)
      expect(response.status).to eq 403

      json = {
        errors: ['使用されているため削除できません。']
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end
end
