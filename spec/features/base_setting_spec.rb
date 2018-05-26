# frozen_string_literal: true

require 'rails_helper'

feature 'Base Setting Page', js: true do
  let!(:user) { create(:user) }

  background do
    sign_in(user)
  end

  scenario 'Link to base setting page.' do
    visit root_path
    click_link I18n.t('menu.settings')
    expect(page).to have_content I18n.t('title.base_settings')
  end

  scenario 'Connect to base setting page.' do
    visit base_setting_path
    expect(page).to have_content I18n.t('title.base_settings')
  end

  after do
    logout(:user)
  end
end
