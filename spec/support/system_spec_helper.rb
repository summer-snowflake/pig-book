# frozen_string_literal: true

module SystemSpecHelper
  def sign_in(user)
    visit users_sign_in_path

    expect(page).to have_content 'ログイン'

    fill_in 'user_email', with: user.email
    fill_in 'user_password', with: user.password
    click_button 'ログインする'

    expect(page).to have_content 'ログインしました'
    expect(current_path).to eq mypage_path
  end
end
