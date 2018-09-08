# frozen_string_literal: true

require 'rails_helper'

feature 'MYPAGE', js: true do
  let!(:user) { create(:user) }

  background do
    sign_in(user)
  end

  scenario 'Link to dashboard.' do
    visit root_path
    expect(page).to have_content I18n.t('menu.dashboard')
  end

  scenario 'Display the dashboard.' do
    visit dashboard_path
    within '.card-header' do
      expect(page).to have_content I18n.t('menu.dashboard')
    end
  end

  after do
    logout(:user)
  end
end
