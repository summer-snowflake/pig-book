# frozen_string_literal: true

require 'rails_helper'

feature 'ADMIN:USER', js: true do
  let!(:user) { create(:user) }

  background do
    sign_in(user)
  end

  context 'user is not administrator' do
    scenario 'not display users list' do
      visit root_path
      within '.navbar' do
        expect(page).to have_no_content I18n.t('menu.admin')
      end
    end
  end

  context 'user is administrator' do
    let!(:admin) { create(:admin, user: user) }

    scenario 'Link to users list.' do
      visit root_path
      click_link I18n.t('menu.admin')
      expect(page).to have_content I18n.t('title.admin.users')
    end

    scenario 'Connect to admin page.' do
      visit admin_users_path
      expect(page).to have_content I18n.t('title.admin.users')
    end

    context 'there are some users' do
      let!(:user1) { create(:user) }
      let!(:user2) { create(:user, confirmed_at: Time.zone.now) }

      background do
        visit admin_users_path
      end

      scenario 'Display the users' do
        expect(page).to have_content I18n.t('title.admin.users')

        expect(page).to have_content user1.email
        expect(page).to have_content user2.email
      end
    end
  end

  after do
    logout(:user)
  end
end
