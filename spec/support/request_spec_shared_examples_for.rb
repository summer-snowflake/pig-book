# frozen_string_literal: true

require 'rails_helper'

shared_examples_for 'set alert message of the authentication' do
  it do
    expect(flash[:alert]).to eq 'アカウント登録もしくはログインしてください。'
  end
end

shared_examples_for 'returns status code 404 because delete twice' do
  it do
    delete path
    expect(response.status).to eq 204

    delete path
    expect(response.status).to eq 404
  end
end

shared_examples_for 'returns status code 403 because it is already in use' do
  it do
    delete path
    expect(response.status).to eq 403

    json = {
      errors: ['使用されているため削除できません。']
    }.to_json
    expect(response.body).to be_json_eql(json)
  end
end
