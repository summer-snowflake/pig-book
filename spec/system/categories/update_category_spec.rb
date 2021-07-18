# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Update Category', type: :system, js: true do
  let!(:user) { create(:user, :active) }
  let!(:category1) { create(:category, :income, user: user, name: '臨時収入') }
  let!(:category2) { create(:category, user: user, name: '光熱費') }

  before do
    sign_in user
    visit categories_path
  end

  it 'display categories' do
    within all('.category-item-component')[0] do
      expect(page).to have_css '.fa-minus-square'
      expect(page).to have_content '光熱費'
    end
    within all('.category-item-component')[1] do
      expect(page).to have_css '.fa-plus-square'
      expect(page).to have_content '臨時収入'
    end
  end

  context 'params are valid' do
    it 'update category' do
      within all('.category-item-component')[1] do
        find('.fa-edit').click
        find(:css, "label[for=category_balance_of_payments_outgo_undefined_#{category1.id}]").set(true)
        fill_in 'category_name', with: '旅費交通費'
        click_button '更新する'
      end

      expect(page).to have_content 'カテゴリを編集しました'

      within all('.category-item-component')[0] do
        expect(page).to have_css '.fa-minus-square'
        expect(page).to have_content '光熱費'
      end
      within all('.category-item-component')[1] do
        expect(page).to have_css '.fa-minus-square'
        expect(page).to have_content '旅費交通費'
      end
    end
  end

  context 'name is empty' do
    it 'raise a validation error' do
      within all('.category-item-component')[1] do
        find('.fa-edit').click
        fill_in 'category_name', with: ''
        click_button '更新する'
      end
      expect(page).to have_content 'カテゴリ名を入力してください'
    end
  end

  context 'Cancel' do
    it 'cancel without updating' do
      within all('.category-item-component')[1] do
        find('.fa-edit').click
        find('.fa-times').click

        expect(page).to have_no_css '.form-control'
      end
    end

    it 'cancel with updating' do
      within all('.category-item-component')[1] do
        find('.fa-edit').click
        fill_in 'category_name', with: '旅費交通費'
        find('.fa-times').click

        expect(page).to have_css '.form-control'
      end

      within '.modal-body' do
        expect(page).to have_content '更新を取り消しますか？'
      end
      within '.modal-header' do
        find('.fa-times').click
      end

      expect(page).to have_no_css '.modal-body'

      within all('.category-item-component')[1] do
        find('.fa-times').click
      end
      within '.modal-body' do
        expect(page).to have_content '更新を取り消しますか？'
      end
      within '.modal-footer' do
        click_button '取り消す'
      end
      within all('.category-item-component')[1] do
        expect(page).to have_no_css '.form-control'
        expect(page).to have_css '.fa-plus-square'
        expect(page).to have_content '臨時収入'
      end
    end
  end
end
