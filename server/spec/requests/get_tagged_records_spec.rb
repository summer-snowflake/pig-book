# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/records/:record_id/tagged_records', autodoc: true do
  let!(:user) { create(:user, :active) }
  let!(:record) { create(:record, user: user) }
  let!(:tag1) { create(:tag, user: user) }
  let!(:tag2) { create(:tag, user: user) }
  let!(:tagged_record1) { create(:tagged_record, tag: tag1, record: record) }
  let!(:tagged_record2) { create(:tagged_record, tag: tag2, record: record) }

  context 'when NOT logged in.' do
    it 'returns status code 401 and json errors data' do
      get "/api/records/#{record.id}/tagged_records"

      expect(response.status).to eq 401
      json = {
        errors: ['アカウント登録もしくはログインしてください。']
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'when logged in.' do
    it 'returns status code 200 and json categories data' do
      get "/api/records/#{record.id}/tagged_records", headers: login_headers_with_login(user)

      expect(response.status).to eq 200
      json = [
        {
          id: tagged_record1.id,
          record_id: record.id,
          tag_id: tag1.id,
          tag: {
            name: tag1.name,
            color_code: tag1.color_code,
            user_id: user.id
          }
        },
        {
          id: tagged_record2.id,
          record_id: record.id,
          tag_id: tag2.id,
          tag: {
            name: tag2.name,
            color_code: tag2.color_code,
            user_id: user.id
          }
        }
      ].to_json
      expect(response.body).to be_json_eql(json)
    end
  end
end
