# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'SignUp Page', type: :system, js: true do
  context 'user is active' do
    let(:email) { 'create_user@sample.com' }

    it 'Sign Up' do
      visit users_sign_up_path

      within '.card-header' do
        expect(page).to have_content 'アカウント登録'
      end

      fill_in 'user_email', with: email
      fill_in 'user_password', with: 'password'
      fill_in 'user_password_confirmation', with: 'password'
      click_button '登録する'

      expect(page).to have_content '本人確認用のメールを送信しました。メール内のリンクからアカウントを有効化させてください。'
      expect(current_path).to eq users_sign_in_path

      user = User.find_by(email: email)
      open_email(email)
      expect(current_email.subject).to eq 'アカウントの有効化について'
      expect(current_email.body).to have_content email

      confirmation_url = user_confirmation_url(confirmation_token: user.confirmation_token)
      expect(current_email.body).to have_content confirmation_url

      visit confirmation_url

      expect(page).to have_content 'アカウントを有効にしました。ログインしてください。'
      expect(current_path).to eq users_sign_in_path
    end
  end

  context 'user already sign up as active user' do
    let!(:user) { create(:user, :active) }

    it 'Sign Up fails' do
      visit users_sign_up_path

      within '.card-header' do
        expect(page).to have_content 'アカウント登録'
      end

      fill_in 'user_email', with: user.email
      fill_in 'user_password', with: user.password
      fill_in 'user_password_confirmation', with: user.password
      click_button '登録する'

      expect(page).to have_content 'アカウント登録に失敗しました'
      expect(page).to have_content 'メールアドレスはすでに登録されています'
      expect(current_path).to eq users_sign_up_path
    end
  end

  context 'user already sign up as inactive user' do
    let!(:user) { create(:user) }

    it 'Sign Up fails' do
      visit users_sign_up_path

      within '.card-header' do
        expect(page).to have_content 'アカウント登録'
      end

      fill_in 'user_email', with: user.email
      fill_in 'user_password', with: user.password
      fill_in 'user_password_confirmation', with: user.password
      click_button '登録する'

      expect(page).to have_content 'アカウント登録に失敗しました'
      expect(page).to have_content 'メールアドレスはすでに登録されています'
      expect(current_path).to eq users_sign_up_path
    end
  end

  context 'params are invalid' do
    it 'Sign Up fails' do
      visit users_sign_up_path

      within '.card-header' do
        expect(page).to have_content 'アカウント登録'
      end

      fill_in 'user_email', with: 'invalid'
      fill_in 'user_password', with: 'password'
      fill_in 'user_password_confirmation', with: 'invalid_password'
      click_button '登録する'

      expect(page).to have_content 'アカウント登録に失敗しました'
      expect(page).to have_content 'メールアドレスはメールアドレスではありません'
      expect(page).to have_content 'パスワード（確認）とパスワードの入力が一致しません'
      expect(current_path).to eq users_sign_up_path
    end
  end
end
