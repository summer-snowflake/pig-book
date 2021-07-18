# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Header', type: :system, js: true do
  it 'Display menus' do
    visit root_path

    expect(page).to have_content 'HOME'
    expect(page).to have_content 'ログイン'
  end
end
