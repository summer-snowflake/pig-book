# frozen_string_literal: true

require 'rails_helper'

feature 'CATEGORY', js: true do
  let!(:user) { create(:user) }

  background do
    sign_in(user)
  end

  scenario 'Link to categories list.' do
    visit root_path
    click_link I18n.t('menu.settings')
    expect(page).to have_content I18n.t('title.category_list')
  end

  scenario 'Connect to base setting page.' do
    visit categories_path
    expect(page).to have_content I18n.t('title.category_list')
  end

  scenario 'Display the categories' do
    visit categories_path
    expect(page).to have_content I18n.t('title.category_list')
  end

  after do
    logout(:user)
  end
end
