# frozen_string_literal: true

require 'rails_helper'

describe 'POST /api/import_histories/rename_rows' do
  let!(:user) { create(:user) }
  let!(:import_history1) do
    create(:import_history, user: user, row: '2018-01-11,水道光熱費,ガス代,,7000')
  end
  let!(:import_history2) do
    create(:import_history, user: user, row: '2018-03-11,水道光熱費,水道代,,4000')
  end
  let!(:import_history3) do
    create(:import_history, user: user, row: '2018-03-11,水道,水道代,,3000')
  end

  context 'ログインしていなかった場合' do
    it '401とデータが返ってくること' do
      post '/api/import_histories/rename_rows'

      expect(response.status).to eq 401
      json = {
        error_message: I18n.t('messages.alert.authentication_error')
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'ログインしていた場合' do
    it '200とデータが返ってくること' do
      params = {
        before: '水道光熱費',
        after: '水道・光熱費',
        last_request_at: Time.zone.now
      }
      post '/api/import_histories/rename_rows',
           params: params, headers: login_headers(user)

      expect(response.status).to eq 200

      json = [
        import_history1.id, import_history2.id
      ].to_json
      expect(response.body).to be_json_eql(json)

      expect(import_history1.reload.row).to eq '2018-01-11,水道・光熱費,ガス代,,7000'
      expect(import_history2.reload.row).to eq '2018-03-11,水道・光熱費,水道代,,4000'
      expect(import_history3.reload.row).to eq '2018-03-11,水道,水道代,,3000'
    end
  end
end
