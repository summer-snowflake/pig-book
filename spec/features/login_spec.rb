# frozen_string_literal: true

require 'rails_helper'

feature 'LOGIN', js: true do
  scenario 'Connect to login page.' do
    visit new_user_session_path
    within '.card-header' do
      expect(page).to have_content I18n.t('menu.login')
    end
  end

  scenario 'Link to login page.' do
    visit root_path
    click_link I18n.t('menu.login')
    within '.card-header' do
      expect(page).to have_content I18n.t('menu.login')
    end
  end

  scenario 'Display the login page.' do
    visit new_user_session_path
    within '.card-body' do
      expect(page).to have_content I18n.t('button.twitter_login')
    end
  end

  context 'there is a user' do
    let!(:user) { create(:user, confirmed_at: Time.zone.now) }

    scenario 'Connect to mypage after sign in. and Sign out.' do
      visit new_user_session_path

      fill_in 'user_email', with: user.email
      fill_in 'user_password', with: user.password
      click_button I18n.t('button.login')

      expect(current_path).to eq mypage_path

      click_button I18n.t('menu.logout')

      expect(current_path).to eq new_user_session_path
    end
  end
end
