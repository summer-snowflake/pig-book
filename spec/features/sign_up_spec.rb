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

  context 'email address not registered' do
    background do
      clear_emails
    end
    let(:email) { 'new_user@example.com' }

    scenario 'Sent a mail to sign up, and Redirect to login page' do
      visit new_user_registration_path

      fill_in 'user_email', with: email
      fill_in 'user_password', with: 'password'
      fill_in 'user_password_confirmation', with: 'password'
      click_button I18n.t('button.sign_up')

      expect(current_path).to eq new_user_session_path
      user = User.last
      expect(user.confirmed_at).to be_nil

      open_email(email)
      expect(current_email).to have_content email

      visit user_confirmation_path(confirmation_token: user.confirmation_token)

      expect(user.reload.confirmed_at).not_to be_nil

      fill_in 'user_email', with: email
      fill_in 'user_password', with: 'password'
      click_button I18n.t('button.login')

      expect(current_path).to eq mypage_path
    end
  end
end
