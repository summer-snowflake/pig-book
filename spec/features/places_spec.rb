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

  scenario 'Connect to places list page.' do
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
      trigger_click('#add-button')
      within '.alert.alert-success' do
        expect(page).to have_content '追加しました'
      end
      place = user.places.last

      within "#place-#{place.id}" do
        expect(page).to have_content '施設名'
      end

      # バリデーションエラー
      fill_in 'place_name', with: ''
      trigger_click('#add-button')

      expect(page).to have_content '店名・施設名を入力してください'

      fill_in 'place_name', with: '施設名２'
      trigger_click('#add-button')
      within '.alert.alert-success' do
        expect(page).to have_content '追加しました'
      end
      place = user.places.last

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

    describe 'place categories list' do
      let!(:category1) { create(:category, user: user, name: '旅費交通費') }
      let!(:category2) { create(:category, :income, user: user, name: '臨時収入') }

      scenario 'Set category to the place' do
        within "#place-#{place1.id}" do
          trigger_click('.badge.badge-info span .fas.fa-plus')
        end
        within '.modal-body' do
          select '旅費交通費', from: 'category'
        end
        within '.modal-footer' do
          trigger_click('#submit')
        end
        expect(page).to have_content '追加しました'
        within "#place-#{place1.id}" do
          expect(page).to have_content '旅費交通費'
        end
        within "#place-#{place2.id}" do
          expect(page).not_to have_content '旅費交通費'
        end

        # モーダル上のカテゴリリストの確認
        within "#place-#{place1.id}" do
          trigger_click('.badge.badge-info span .fas.fa-plus')
        end
        within '.modal-body' do
          options = find_field('category').find_all('option').map(&:text)
          expect(options).to eq %w[-\ カテゴリ\ - 臨時収入]
        end
        within '.modal-footer' do
          trigger_click('#cancel')
        end

        within "#place-#{place2.id}" do
          trigger_click('.badge.badge-info span .fas.fa-plus')
        end
        within '.modal-body' do
          options = find_field('category').find_all('option').map(&:text)
          expect(options).to eq %w[-\ カテゴリ\ - 旅費交通費 臨時収入]
        end
        within '.modal-footer' do
          trigger_click('#cancel')
        end
      end
    end
  end

  after do
    logout(:user)
  end
end
