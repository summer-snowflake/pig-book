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

  context 'There are some records.' do
    let!(:category) { create(:category, user: user) }
    let!(:record1) do
      create(:record,
             user: user, category: category,
             published_at: Time.zone.today)
    end
    let!(:record2) do
      create(:record,
             user: user,
             published_at: Time.zone.today.beginning_of_month)
    end

    scenario 'Display the records of the current month.' do
      visit records_path
      within '.records-component' do
        within all('.record-component')[0] do
          expect(page).to have_content category.name
          expect(page).to have_content record1.breakdown.name
        end
        within all('.record-component')[1] do
          expect(page).to have_no_content category.name
          expect(page).to have_content record2.breakdown.name
        end
      end
    end
  end

  after do
    logout(:user)
  end
end
