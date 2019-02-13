# frozen_string_literal: true

require 'rails_helper'

describe 'POST /api/import_histories/:import_history_id/record' do
  let!(:user) { create(:user) }
  let!(:import_history) { create(:import_history, user: user) }
  # NOTE: import_historyに設定されているrowの値はすでに登録済みであること
  let!(:place) { create(:place, user: user, name: '歯医者') }
  let!(:tag) { create(:tag, user: user, name: '医療費控除対象') }

  context 'ログインしていなかった場合' do
    it '401とデータが返ってくること' do
      post "/api/import_histories/#{import_history.id}/record"

      expect(response.status).to eq 401
      json = {
        error_message: I18n.t('messages.alert.authentication_error')
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'ログインしていた場合' do
    context 'カテゴリが登録されいた場合' do
      let!(:category) { create(:category, user: user, name: '医療費') }
      let!(:breakdown) { create(:breakdown, category: category, name: '診察代') }
      let!(:categorized_place) do
        create(:categorized_place, category: category, place: place)
      end

      it '201が返ってくること' do
        params = {
          last_request_at: Time.zone.now
        }
        post "/api/import_histories/#{import_history.id}/record",
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

    context 'カテゴリがなかった場合' do
      it '422が返ってくること' do
        params = {
          last_request_at: Time.zone.now
        }
        post "/api/import_histories/#{import_history.id}/record",
             params: params, headers: login_headers(user)

        expect(response.status).to eq 422

        json = {
          error_messages: {
            category_name: ['カテゴリが登録されていません'],
            breakdown_name: ['内訳が登録されていません']
          }
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end

    context 'すでに登録済みであった場合' do
      let(:import_history) { create(:import_history, :registered, user: user) }

      it '422が返ってくること' do
        params = {
          last_request_at: Time.zone.now
        }
        post "/api/import_histories/#{import_history.id}/record",
             params: params, headers: login_headers(user)

        expect(response.status).to eq 422

        json = {
          error_messages: {
            record: ['対象の記録はすでに登録されています']
          }
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end
  end
end
