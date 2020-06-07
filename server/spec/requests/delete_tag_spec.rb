# frozen_string_literal: true

require 'rails_helper'

describe 'DELETE /api/tags/:id', autodoc: true do
  let!(:user) { create(:user, :active) }
  let!(:tag) { create(:tag, user: user) }

  context 'when NOT logged in.' do
    it 'returns status code 401 and json errors data' do
      delete "/api/tags/#{tag.id}"

      expect(response.status).to eq 401
      json = {
        errors: ['アカウント登録もしくはログインしてください。']
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'when logged in.' do
    it 'returns status code 204' do
      delete "/api/tags/#{tag.id}",
             headers: login_headers_with_login(user)

      expect(response.status).to eq 204
    end
  end

  context 'when twice delete it' do
    it 'returns status code 403' do
      delete "/api/tags/#{tag.id}",
             headers: login_headers_with_login(user)
      expect(response.status).to eq 204

      delete "/api/tags/#{tag.id}",
             headers: login_headers_with_login(user)
      expect(response.status).to eq 403
    end
  end

  context 'when already be used by record' do
    let!(:record) { create(:record, user: user) }
    let!(:tagged_record) { create(:tagged_record, record: record, tag: tag) }

    it 'returns status code 403' do
      delete "/api/tags/#{tag.id}",
             headers: login_headers_with_login(user)
      expect(response.status).to eq 403

      json = {
        errors: ['使用されているため削除できません。']
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end
end
