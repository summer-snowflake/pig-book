# frozen_string_literal: true

require 'rails_helper'

describe 'POST /api/piggy_banks', autodoc: true do
  let!(:user) { create(:user, :active) }
  let(:path) { '/api/piggy_banks' }

  context 'when NOT logged in.' do
    before do
      post path
    end

    it_behaves_like 'set alert message of the authentication'
  end

  context 'when logged in.' do
    before do
      sign_in user
    end

    context 'name is valid' do
      it 'returns status code 201 and json piggy_bank data' do
        params = {
          title: '貯金箱の名前',
          description: '貯金箱の説明',
          currency: 'yen'
        }
        post path, params: params
        expect(response.status).to eq 201

        json = {
          user_id: user.id,
          title: '貯金箱の名前',
          description: '貯金箱の説明',
          currency: :yen
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end

    context 'already has same piggy_bank name' do
      let!(:piggy_bank) { create(:piggy_bank, user: user, title: '同じ貯金箱の名前') }

      it 'returns status code 422 and json errors data' do
        params = {
          title: '同じ貯金箱の名前',
          description: '',
          currency: 'yen'
        }
        post path, params: params
        expect(response.status).to eq 422

        json = {
          errors: ['タイトルはすでに登録されています']
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end

    context 'piggy_bank title is empty' do
      it 'returns status code 422 and json errors data' do
        params = {
          title: '',
          description: '',
          currency: 'yen'
        }
        post path, params: params
        expect(response.status).to eq 422

        json = {
          errors: ['タイトルを入力してください']
        }.to_json
        expect(response.body).to be_json_eql(json)
      end
    end
  end
end
