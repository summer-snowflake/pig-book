# frozen_string_literal: true

require 'rails_helper'

feature 'RECORDS', js: true do
  let!(:user) { create(:user) }

  background do
    sign_in(user)
  end

  scenario 'Link to list page' do
    visit root_path
    click_link I18n.t('menu.list')
    within '.card-header' do
      expect(page).to have_content I18n.t('menu.list')
    end
  end

  scenario 'Connect to list page.' do
    visit records_path
    within '.card-header' do
      expect(page).to have_content I18n.t('menu.list')
    end
  end

  after do
    logout(:user)
  end
end
