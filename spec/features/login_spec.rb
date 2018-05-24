# frozen_string_literal: true

require 'rails_helper'

feature 'LOGIN', js: true do
  scenario 'Connect to login page.' do
    visit new_session_path
    expect(page).to have_content 'ログイン画面'
  end

  scenario 'Link to home page.' do
    visit root_path
    click_link I18n.t('menu.login')
    expect(page).to have_content 'ログイン画面'
  end
end
