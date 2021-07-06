# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Resend Email Page', type: :system, js: true do
  context 'when user is active' do
    let!(:user) { create(:user, :active, email: email) }
    let(:email) { 'create_user@sample.com' }

    it 'Send Email' do
      visit users_confirmations_path

      within '.card-header' do
        expect(page).to have_content '認証メール再送'
      end

      fill_in 'user_email', with: email
      click_button '送信する'

      expect(page).to have_content 'メールを送信しました'

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

  context 'when user email is empty' do
    it 'Display validation error messages' do
      visit users_confirmations_path

      within '.card-header' do
        expect(page).to have_content '認証メール再送'
      end

      click_button '送信する'

      expect(page).to have_content 'メールの送信ができませんでした'
      expect(page).to have_content 'メールアドレスを入力してください。'
    end
  end

  context 'when user is not found' do
    it 'Display validation error messages' do
      visit users_confirmations_path

      within '.card-header' do
        expect(page).to have_content '認証メール再送'
      end

      fill_in 'user_email', with: 'dummy@example.com'
      click_button '送信する'

      expect(page).to have_content 'メールの送信ができませんでした'
      expect(page).to have_content '対象メールアドレスのユーザーが見つかりませんでした。'
    end
  end
end
