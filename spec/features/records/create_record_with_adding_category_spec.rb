# frozen_string_literal: true

require 'rails_helper'

feature 'Create RECORD via Picker Buttons and Add form', js: true do
  let!(:user) { create(:user) }

  background do
    sign_in(user)
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
