# frozen_string_literal: true

require 'rails_helper'

describe 'POST /api/tags', autodoc: true do
  let!(:user) { create(:user, :active) }
  let!(:tag) { create(:tag, user: user) }
  let(:path) { '/api/tags' }

  context 'when NOT logged in.' do
    before do
      post path
    end

    it_behaves_like 'set alert message of the authentication'
  end

  context 'when logged in.' do
    context 'name is valid' do
      it 'returns status code 201 and json tag data' do
        params = {
          name: '新しいラベル',
          color_code: '#000000'
        }
        post path, params: params, headers: login_headers_with_login(user), as: :json
        expect(response.status).to eq 201

        json = {
          name: '新しいラベル',
          color_code: '#000000',
          user_id: user.id
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end

    context 'already has same tag name' do
      let!(:tag) do
        create(:tag, user: user, name: '同じラベル')
      end

      it 'returns status code 422 and json errors data' do
        params = {
          name: '同じラベル',
          color_code: tag.color_code
        }
        post path, params: params, headers: login_headers_with_login(user), as: :json
        expect(response.status).to eq 422

        json = {
          errors: %w[ラベルはすでに登録されています カラーコードはすでに登録されています]
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end

    context 'tag name is empty' do
      it 'returns status code 422 and json errors data' do
        params = {
          name: ''
        }
        post path, params: params, headers: login_headers_with_login(user), as: :json
        expect(response.status).to eq 422

        json = {
          errors: %w[ラベルを入力してください カラーコードを入力してください]
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end
  end
end
