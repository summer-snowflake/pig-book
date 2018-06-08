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

    scenario 'Create some places' do
      # お店・施設の追加
      fill_in 'place_name', with: '施設名'
      click_button I18n.t('button.add')
      expect(page).to have_content '追加しました'
      place = Place.last

      within "#place-#{place.id}" do
        expect(page).to have_content '施設名'
      end

      # バリデーションエラー
      fill_in 'place_name', with: ''
      click_button I18n.t('button.add')

      expect(page).to have_content '店名・施設名を入力してください'

      fill_in 'place_name', with: '施設名２'
      click_button I18n.t('button.add')
      expect(page).to have_content '追加しました'
      place = Place.last

      within "#place-#{place.id}" do
        expect(page).to have_content '施設名２'
      end
    end

    scenario 'Destroy the target place' do
      within '.card-body' do
        within "#place-#{place2.id}" do
          find('i.far.fa-trash-alt').click
        end
      end

      # 閉じる
      expect(page).to have_css '.modal-body'
      within '.modal-body' do
        # TODO: I18nを適用する
        expect(page).to have_content '削除してもよろしいですか？'
      end
      within '.modal-footer' do
        find('button#cancel').click
      end

      within '.card-body' do
        expect(page).to have_content place2.name
        within "#place-#{place2.id}" do
          find('.far.fa-trash-alt').click
        end
      end

      # 削除
      expect(page).to have_css '.modal-body'
      within '.modal-body' do
        expect(page).to have_content '削除してもよろしいですか？'
      end
      within '.modal-footer' do
        find('button#submit').click
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
