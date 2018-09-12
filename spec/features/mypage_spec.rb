# frozen_string_literal: true

require 'rails_helper'

feature 'MYPAGE', js: true do
  let!(:user) { create(:user) }

  background do
    sign_in(user)
  end

  scenario 'Link to mypage.' do
    visit root_path
    click_link user.email
    expect(page).to have_content I18n.t('title.recent_list')
  end

  scenario 'Display the mypage' do
    visit mypage_path
    expect(page).to have_content I18n.t('menu.mypage_top')
    expect(page).to have_content I18n.t('title.recent_list')
  end

  context 'there is import data' do
    let!(:import_history) { create(:import_history, user: user) }

    it 'Display the import history counter number' do
      visit mypage_path
      within '.list-group' do
        expect(page).to have_content 1
      end
    end
  end

  after do
    logout(:user)
  end
end
