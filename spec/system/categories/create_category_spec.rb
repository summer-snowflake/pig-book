# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Create Category', type: :system, js: true do
  let!(:user) { create(:user, :active) }

  before do
    sign_in user
    visit categories_path
  end

  context 'name is empty' do
    it 'raise a validation error' do
      click_button '追加する'
      expect(page).to have_content 'カテゴリ名を入力してください'
    end
  end

  context 'params are valid' do
    it 'create category' do
      fill_in 'category_name', with: '光熱費'
      click_button '追加する'

      expect(page).to have_content 'カテゴリを追加しました'
      within all('.category-item-component')[0] do
        expect(page).to have_css '.fa-minus-square'
        expect(page).to have_content '光熱費'
      end

      expect(page).to have_content '1 / 20'
    end

    it 'create category' do
      find(:css, 'label[for=category_balance_of_payments_income_undefined_undefined]').set(true)
      fill_in 'category_name', with: '収入'
      click_button '追加する'

      expect(page).to have_content 'カテゴリを追加しました'
      within all('.category-item-component')[0] do
        expect(page).to have_css '.fa-plus-square'
        expect(page).to have_content '収入'
      end

      expect(page).to have_content '1 / 20'
    end
  end
end
