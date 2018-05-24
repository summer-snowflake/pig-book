# frozen_string_literal: true

require 'rails_helper'

feature 'HOME', js: true do
  scenario 'アクセスしてHOME画面が表示されること' do
    visit root_path
    expect(page).to have_content 'welcome'
  end
end
