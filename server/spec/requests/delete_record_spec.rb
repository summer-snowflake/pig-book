# frozen_string_literal: true

require 'rails_helper'

describe 'DELETE /api/records/:id', autodoc: true do
  let!(:user) { create(:user) }
  let!(:category) { create(:category, user: user) }
  let!(:breakdown) { create(:breakdown, user: user, category: category) }
  let!(:place) { create(:place, user: user) }
  let!(:record) do
    create(:record, user: user, category: category, breakdown: breakdown)
  end

  context 'when NOT logged in.' do
    it 'returns status code 401 and json errors data' do
      delete "/api/records/#{record.id}"

      expect(response.status).to eq 401
      json = {
        errors: ['アカウント登録もしくはログインしてください。']
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'when logged in.' do
    it 'returns status code 204' do
      delete "/api/records/#{record.id}",
             headers: login_headers_with_login(user)

      expect(response.status).to eq 204
    end
  end

  context 'when twice delete it' do
    it 'returns status code 404' do
      delete "/api/records/#{record.id}",
             headers: login_headers_with_login(user)
      expect(response.status).to eq 204

      delete "/api/records/#{record.id}",
             headers: login_headers_with_login(user)
      expect(response.status).to eq 404
    end
  end
end
