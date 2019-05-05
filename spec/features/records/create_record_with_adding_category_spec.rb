# frozen_string_literal: true

require 'rails_helper'

feature 'Create RECORD via Picker Buttons and Add form', js: true do
  let!(:user) { create(:user) }

  background do
    sign_in(user)
  end

  context 'via Picker Buttons' do
    scenario 'Add a record from category picker button.' do
      add_category(name: '支出カテゴリ')
      add_category(balance_of_payments: true, name: '収入カテゴリ')

      add_record(category_name: '支出カテゴリ')
      within '.picker-form-component' do
        expect(page).to have_content '支出カテゴリ'
        expect(page).to have_no_content '収入カテゴリ'
      end

      add_record(category_name: '収入カテゴリ')
      within '.picker-form-component' do
        expect(page).to have_content '支出カテゴリ'
        expect(page).to have_content '収入カテゴリ'
      end

      within '.picker-form-component' do
        find('.category-picker-component', text: '収入カテゴリ').click
      end
      fill_in 'record_charge', with: '400'
      click_on '登録する'
      sleep 0.5

      within '.related-records-component' do
        records_dom = all('table.table tr.record-component')
        expect(records_dom[0]).to have_content '収入カテゴリ'
        expect(records_dom[0]).to have_content '400'
        expect(records_dom[1]).to have_content '収入カテゴリ'
        expect(records_dom[2]).to have_content '支出カテゴリ'
        expect(records_dom.count).to eq 4
      end
    end
  end

  context 'via Input Form' do
    scenario 'Add a new category.' do
      visit new_record_path

      expect(all('#selectable-categories').map(&:text)).to eq ['- カテゴリ -']

      within '.categories-select-box-component' do
        find('.fas.fa-plus').click
      end

      expect(page).to have_css '.modal-body'
      within '.modal-body' do
        fill_in 'category_name', with: '新しいカテゴリ名'
        click_on '追加する'
      end

      sleep 0.5
      expect(all('#selectable-categories').map(&:text)).to eq ['新しいカテゴリ名']
    end
  end

  after do
    logout(:user)
  end
end
