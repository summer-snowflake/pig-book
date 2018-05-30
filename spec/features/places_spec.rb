# frozen_string_literal: true

require 'rails_helper'

feature 'PLACE', js: true do
  let!(:user) { create(:user) }

  background do
    sign_in(user)
  end

  scenario 'Link to places list.' do
    visit root_path
    click_link I18n.t('menu.settings')
    expect(page).to have_content I18n.t('title.place_list')
  end

  scenario 'Connect to base setting page.' do
    visit places_path
    expect(page).to have_content I18n.t('title.place_list')
  end

  context 'there are some places' do
    let!(:place1) { create(:place, user: user) }
    let!(:place2) { create(:place, user: user) }

    background do
      visit places_path
    end

    scenario 'Display the places' do
      expect(page).to have_content I18n.t('title.place_list')

      within '.card-body' do
        within "#place-#{place1.id}" do
          expect(page).to have_content place1.name
        end
        within "#place-#{place2.id}" do
          expect(page).to have_content place2.name
        end
      end
    end

    scenario 'Destroy the target place' do
      within '.card-body' do
        within "#place-#{place2.id}" do
          find('i.far.fa-trash-alt').click
        end
      end

      # 閉じる
      expect(page).to have_css '.modal'
      within '.modal' do
        # TODO: I18nを適用する
        expect(page).to have_content '削除してもよろしいですか？'
        trigger_click('button#cancel')
      end

      within '.card-body' do
        expect(page).to have_content place2.name
        within "#place-#{place2.id}" do
          find('.far.fa-trash-alt').click
        end
      end

      # 削除
      expect(page).to have_css '.modal'
      within '.modal' do
        expect(page).to have_content '削除してもよろしいですか？'
        trigger_click('button#submit')
      end
      within '.card-body' do
        expect(page).to have_no_content place2.name
      end
    end
  end

  after do
    logout(:user)
  end
end
