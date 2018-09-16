# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/import_histories/registered' do
  let!(:user) { create(:user) }
  let!(:record1) { create(:record, user: user) }
  let!(:record2) { create(:record, user: user) }
  let!(:import_history1) do
    create(:import_history, user: user, record: record1,
                            row: '2014-03-25,水道光熱費,電気代,,4122,,', messages: '')
  end
  let!(:import_history2) do
    create(:import_history, user: user, record: record2,
                            row: '2014-03-26,飲食費,食事,すき家,450,,', messages: '')
  end
  let!(:import_history3) do
    create(:import_history, user: user,
                            row: '2014-03-27,飲食費,食事,すき家,700,,', messages: '')
  end

  context 'ログインしていなかった場合' do
    it '401とデータが返ってくること' do
      get '/api/import_histories/registered'

      expect(response.status).to eq 401
      json = {
        error_message: I18n.t('messages.alert.authentication_error')
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'ログインしていた場合' do
    it '200とデータが返ってくること' do
      params = { last_request_at: Time.zone.now }
      get '/api/import_histories/registered',
          params: params, headers: login_headers(user)

      expect(response.status).to eq 200
      json = [
        {
          id: import_history1.id,
          row: '2014-03-25,水道光熱費,電気代,,4122,,',
          messages: '',
          status_name: 'registered',
          category_name: '水道光熱費',
          category_required: true,
          breakdown_name: '電気代',
          breakdown_required: true
        },
        {
          id: import_history2.id,
          row: '2014-03-26,飲食費,食事,すき家,450,,',
          messages: '',
          status_name: 'registered',
          category_name: '飲食費',
          category_required: true,
          breakdown_name: '食事',
          breakdown_required: true
        }
      ].to_json
      expect(response.body).to be_json_eql(json)
    end
  end
end
