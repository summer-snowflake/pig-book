# frozen_string_literal: true

require 'rails_helper'

feature 'LOGIN', js: true do
  scenario 'Connect to login page.' do
    visit new_session_path
    within '.card-header' do
      expect(page).to have_content 'ログイン'
    end
  end

  scenario 'Link to home page.' do
    visit root_path
    click_link I18n.t('menu.login')
    within '.card-header' do
      expect(page).to have_content 'ログイン'
    end
  end
end
