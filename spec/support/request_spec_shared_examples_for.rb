# frozen_string_literal: true

require 'rails_helper'

shared_examples_for 'set alert message of the authentication' do
  it do
    expect(response.status).to eq 401
    json = {
      errors: ['アカウント登録もしくはログインしてください。']
    }.to_json
    expect(response.body).to eq json
  end
end
