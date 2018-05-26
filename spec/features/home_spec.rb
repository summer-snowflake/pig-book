# frozen_string_literal: true

require 'rails_helper'

feature 'HOME', js: true do
  scenario 'Connect to home page.' do
    visit root_path
    expect(page).to have_content 'welcome'
  end

  scenario 'Link to home page.' do
    visit new_user_session_path
    click_link I18n.t('menu.home')
    expect(page).to have_content 'welcome'
  end
end
