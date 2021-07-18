# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Admin: Users', type: :system, js: true do
  let!(:user) { create(:user, :active) }

  context 'user is NOT administrator' do
    it 'Display not admin menu' do
      sign_in user

      expect(page).to have_no_content '管理'
    end
  end

  context 'user is administrator' do
    let!(:admin_user) { create(:user, :active, :admin) }

    before do
      sign_in admin_user
    end

    it 'Display not admin menu' do
      expect(page).to have_content '管理'

      visit admin_users_path

      within all('.user-item-component')[0] do
        expect(page).to have_content admin_user.email
        expect(page).to have_css '.fa-crown'
      end
      within all('.user-item-component')[1] do
        expect(page).to have_content user.email
        expect(page).to have_no_css '.fa-crown'
      end
    end
  end
end
