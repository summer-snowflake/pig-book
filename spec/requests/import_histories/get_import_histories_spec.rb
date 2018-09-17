# frozen_string_literal: true

require 'rails_helper'

describe 'GET /api/import_histories' do
  let!(:user) { create(:user) }
  let!(:record) { create(:record, user: user) }
  let!(:import_history) do
    create(:import_history, user: user,
                            row: '2014-03-25,水道光熱費,電気代,,4122,,', messages: '')
  end
  let!(:import_history2) do
    create(:import_history, user: user, record: record,
                            row: '2014-03-26,飲食費,食事,すき家,450,,', messages: '')
  end

  context 'ログインしていなかった場合' do
    it '401とデータが返ってくること' do
      get '/api/import_histories'

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
      get '/api/import_histories', params: params, headers: login_headers(user)

      expect(response.status).to eq 200
      json = [
        {
          id: import_history.id,
          row: '2014-03-25,水道光熱費,電気代,,4122,,',
          messages: 'カテゴリ名が登録されていません / 内訳が登録されていません',
          status_name: 'unregistered',
          category_id: nil,
          category_name: '水道光熱費',
          category_required: true,
          breakdown_id: nil,
          breakdown_name: '電気代',
          breakdown_required: true,
          place_id: nil,
          place_name: '',
          place_required: false,
          charge: '4122',
          tags: ''
        },
        {
          id: import_history2.id,
          row: '2014-03-26,飲食費,食事,すき家,450,,',
          messages: 'カテゴリ名が登録されていません / 内訳が登録されていません / 店名・施設名が登録されていません',
          status_name: 'registered',
          category_id: nil,
          category_name: '飲食費',
          category_required: true,
          breakdown_id: nil,
          breakdown_name: '食事',
          breakdown_required: true,
          place_id: nil,
          place_name: 'すき家',
          place_required: true,
          charge: '450',
          tags: ''
        }
      ].to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'カテゴリがある場合' do
    let!(:category) { create(:category, user: user, name: '水道光熱費') }

    it '200とcategory_reuiqred: falseのデータが返ってくること' do
      params = { last_request_at: Time.zone.now }
      get '/api/import_histories', params: params, headers: login_headers(user)

      expect(response.status).to eq 200
      json = [
        {
          id: import_history.id,
          row: '2014-03-25,水道光熱費,電気代,,4122,,',
          messages: '内訳が登録されていません',
          status_name: 'unregistered',
          category_id: category.id,
          category_name: '水道光熱費',
          category_required: false,
          breakdown_id: nil,
          breakdown_name: '電気代',
          breakdown_required: true,
          place_id: nil,
          place_name: '',
          place_required: false,
          charge: '4122',
          tags: ''
        },
        {
          id: import_history2.id,
          row: '2014-03-26,飲食費,食事,すき家,450,,',
          messages: 'カテゴリ名が登録されていません / 内訳が登録されていません / 店名・施設名が登録されていません',
          category_id: nil,
          status_name: 'registered',
          category_name: '飲食費',
          category_required: true,
          breakdown_id: nil,
          breakdown_name: '食事',
          breakdown_required: true,
          place_id: nil,
          place_name: 'すき家',
          place_required: true,
          charge: '450',
          tags: ''
        }
      ].to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'ラベルがある場合' do
    let!(:tag1) { create(:tag, user: user, name: 'タグ１') }
    let!(:tag2) { create(:tag, user: user, name: 'タグ２') }
    let!(:row) { '2014-01-10,医療費,薬品・備品,むこうがおかクリニック,3650,,タグ１,タグ２' }
    let!(:import_history3) do
      create(:import_history, user: user, row: row, messages: '')
    end

    it '200とtagのデータが返ってくること' do
      params = { last_request_at: Time.zone.now }
      get '/api/import_histories', params: params, headers: login_headers(user)

      expect(response.status).to eq 200
      json = [
        {
          id: import_history.id,
          row: '2014-03-25,水道光熱費,電気代,,4122,,',
          messages: 'カテゴリ名が登録されていません / 内訳が登録されていません',
          status_name: 'unregistered',
          category_id: nil,
          category_name: '水道光熱費',
          category_required: true,
          breakdown_id: nil,
          breakdown_name: '電気代',
          breakdown_required: true,
          place_id: nil,
          place_name: '',
          place_required: false,
          charge: '4122',
          tags: ''
        },
        {
          id: import_history2.id,
          row: '2014-03-26,飲食費,食事,すき家,450,,',
          messages: 'カテゴリ名が登録されていません / 内訳が登録されていません / 店名・施設名が登録されていません',
          category_id: nil,
          status_name: 'registered',
          category_name: '飲食費',
          category_required: true,
          breakdown_id: nil,
          breakdown_name: '食事',
          breakdown_required: true,
          place_id: nil,
          place_name: 'すき家',
          place_required: true,
          charge: '450',
          tags: ''
        },
        {
          id: import_history3.id,
          row: '2014-01-10,医療費,薬品・備品,むこうがおかクリニック,3650,,タグ１,タグ２',
          messages: 'カテゴリ名が登録されていません / 内訳が登録されていません / 店名・施設名が登録されていません',
          category_id: nil,
          status_name: 'unregistered',
          category_name: '医療費',
          category_required: true,
          breakdown_id: nil,
          breakdown_name: '薬品・備品',
          breakdown_required: true,
          place_id: nil,
          place_name: 'むこうがおかクリニック',
          place_required: true,
          charge: '3650',
          tags: 'タグ１,タグ２'
        }
      ].to_json
      expect(response.body).to be_json_eql(json)
    end
  end
end
