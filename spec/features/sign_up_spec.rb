# frozen_string_literal: true

require 'rails_helper'

feature 'SIGN UP', js: true do
  scenario 'Connect to sign up page.' do
    visit new_user_registration_path
    within '.card-header' do
      expect(page).to have_content I18n.t('menu.sign_up')
    end
  end

  scenario 'Link to sign up page.' do
    visit root_path
    click_link I18n.t('menu.login')
    click_link I18n.t('menu.sign_up')
    within '.card-header' do
      expect(page).to have_content I18n.t('menu.sign_up')
    end
  end
end
