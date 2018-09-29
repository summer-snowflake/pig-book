# frozen_string_literal: true

require 'rails_helper'

describe 'POST /api/import_histories/:import_history_id/create_record' do
  let!(:user) { create(:user) }
  let!(:import_history) { create(:import_history, user: user) }
  # NOTE: import_historyに設定されているrowの値はすでに登録済みであること
  let!(:category) { create(:category, user: user, name: '医療費') }
  let!(:breakdown) { create(:breakdown, category: category, name: '診察代') }
  let!(:categorized_place) do
    create(:categorized_place, category: category, place: place)
  end
  let!(:place) { create(:place, user: user, name: '歯医者') }
  let!(:tag) { create(:tag, user: user, name: '医療費控除対象') }

  context 'ログインしていなかった場合' do
    it '401とデータが返ってくること' do
      post "/api/import_histories/#{import_history.id}/create_record"

      expect(response.status).to eq 401
      json = {
        error_message: I18n.t('messages.alert.authentication_error')
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'ログインしていた場合' do
    it '201が返ってくること' do
      params = {
        last_request_at: Time.zone.now
      }
      post "/api/import_histories/#{import_history.id}/create_record",
           params: params, headers: login_headers(user)

      expect(response.status).to eq 201

      record = user.records.last
      expect(record.category).to eq category
      expect(record.breakdown).to eq breakdown
      expect(record.place).to eq place
      tag_names = record.tagged_records.map { |tagged| tagged.tag.name }
      expect(tag_names).to eq [tag.name]
    end
  end
end
