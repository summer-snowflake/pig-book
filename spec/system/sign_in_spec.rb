# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'SignIn Page', type: :system, js: true do
  context 'user is active' do
    let!(:user) { create(:user, :active) }

    it 'Sign In' do
      visit users_sign_in_path

      expect(page).to have_content 'ログイン'

      fill_in 'user_email', with: user.email
      fill_in 'user_password', with: user.password
      click_button 'ログインする'

      expect(page).to have_content 'ログインしました'
      expect(page).to have_content 'ログアウト'
      expect(current_path).to eq mypage_path
    end
  end

  context 'user is invalid' do
    let!(:user) { create(:user) }

    it 'Sign In fails' do
      visit users_sign_in_path

      expect(page).to have_content 'ログイン'

      fill_in 'user_email', with: 'invalid'
      fill_in 'user_password', with: 'invalid'
      click_button 'ログインする'

      expect(page).to have_content 'ログインに失敗しました'
      expect(current_path).to eq users_sign_in_path
    end
  end
end
