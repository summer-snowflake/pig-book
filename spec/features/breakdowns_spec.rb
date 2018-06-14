# frozen_string_literal: true

require 'rails_helper'

feature 'BREAKDOWN', js: true do
  let!(:user) { create(:user) }
  let!(:category) { create(:category, user: user) }

  background do
    sign_in(user)
  end

  scenario 'Link to breakdowns list.' do
    visit root_path
    click_link I18n.t('menu.settings')
    expect(page).to have_content I18n.t('title.breakdown_list')
  end

  scenario 'Connect to breakdowns list page.' do
    visit breakdowns_path
    expect(page).to have_content I18n.t('title.breakdown_list')
  end

  context 'there are some breakdowns' do
    let!(:breakdown1) { create(:breakdown, category: category) }
    let!(:breakdown2) { create(:breakdown, category: category) }

    background do
      visit breakdowns_path
    end

    scenario 'Display the breakdowns' do
      expect(page).to have_content I18n.t('title.breakdown_list')

      within '.card-body' do
        within "#breakdown-#{breakdown1.id}" do
          expect(page).to have_content breakdown1.name
        end
        within "#breakdown-#{breakdown2.id}" do
          expect(page).to have_content breakdown2.name
        end
      end
    end

    scenario 'Create some breakdowns' do
      # 内訳の追加
      select category.name
      fill_in 'breakdown_name', with: '内訳の内容'
      trigger_click('#add-button')
      expect(page).to have_content '追加しました'
      breakdown = user.breakdowns.last

      within "#breakdown-#{breakdown.id}" do
        expect(page).to have_content '内訳の内容'
      end

      # バリデーションエラー
      fill_in 'breakdown_name', with: ''
      trigger_click('#add-button')

      expect(page).to have_content '内訳を入力してください'

      fill_in 'breakdown_name', with: '内訳の内容２'
      trigger_click('#add-button')
      expect(page).to have_content '内訳の内容２'
      breakdown = user.breakdowns.last

      within "#breakdown-#{breakdown.id}" do
        expect(page).to have_content '内訳の内容２'
      end
    end

    scenario 'Destroy the target breakdown' do
      within '.card-body' do
        within "#breakdown-#{breakdown2.id}" do
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
        expect(page).to have_content breakdown2.name
        within "#breakdown-#{breakdown2.id}" do
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
        expect(page).to have_no_content breakdown2.name
      end
    end
  end

  after do
    logout(:user)
  end
end
