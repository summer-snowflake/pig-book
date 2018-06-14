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

  scenario 'Connect to categories list page.' do
    visit categories_path
    expect(page).to have_content I18n.t('title.category_list')
  end

  context 'there are some categories' do
    let!(:category1) { create(:category, user: user) }
    let!(:category2) { create(:category, :income, user: user) }

    background do
      visit categories_path
    end

    scenario 'Display the categories' do
      expect(page).to have_content I18n.t('title.category_list')
      within '.card-body' do
        within "#category-#{category1.id}" do
          expect(page).to have_content I18n.t('label.expenditure')
          expect(page).to have_content category1.name
        end
        within "#category-#{category2.id}" do
          expect(page).to have_content I18n.t('label.income')
          expect(page).to have_content category2.name
        end
      end
    end

    scenario 'Create some categories' do
      # 支出のカテゴリ追加
      fill_in 'category_name', with: 'カテゴリ名'
      trigger_click('#add-button')
      expect(page).to have_content '追加しました'
      category = user.categories.last

      within "#category-#{category.id}" do
        expect(page).to have_content '支出'
        expect(page).to have_content 'カテゴリ名'
      end

      # バリデーションエラー
      fill_in 'category_name', with: ''
      trigger_click('#add-button')

      expect(page).to have_content 'カテゴリ名を入力してください'

      choose I18n.t('label.income')
      fill_in 'category_name', with: 'カテゴリ名２'
      trigger_click('#add-button')
      expect(page).to have_content '追加しました'
      category = user.categories.last

      # 収入のカテゴリ追加
      within "#category-#{category.id}" do
        expect(page).to have_content '収入'
        expect(page).to have_content 'カテゴリ名２'
      end
    end

    scenario 'Destroy the target category' do
      within '.card-body' do
        within "#category-#{category2.id}" do
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
        expect(page).to have_content category2.name
        within "#category-#{category2.id}" do
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
      expect(page).to have_content '削除しました'
      within '.card-body' do
        expect(page).to have_no_content category2.name
      end
    end
  end

  after do
    logout(:user)
  end
end
