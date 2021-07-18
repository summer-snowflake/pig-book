# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Update Breakdown', type: :system, js: true do
  let!(:user) { create(:user, :active) }
  let!(:category1) { create(:category, :income, user: user, name: '臨時収入') }
  let!(:category2) { create(:category, user: user, name: '光熱費') }
  let!(:breakdown1) { create(:breakdown, user: user, category: category1, name: '月謝') }
  let!(:breakdown2) { create(:breakdown, user: user, category: category2, name: '電気代') }

  before do
    sign_in user
    visit breakdowns_path
  end

  it 'display breakdowns' do
    within all('.breakdown-item-component')[0] do
      expect(page).to have_css '.fa-minus-square'
      expect(page).to have_content '光熱費'
      expect(page).to have_content '電気代'
    end
    within all('.breakdown-item-component')[1] do
      expect(page).to have_css '.fa-plus-square'
      expect(page).to have_content '臨時収入'
      expect(page).to have_content '月謝'
    end
  end

  context 'params are valid' do
    it 'update breakdown' do
      within all('.breakdown-item-component')[1] do
        find('.fa-edit').click
        find(:css, "label[for=category_balance_of_payments_outgo_undefined_#{category1.id}]").set(true)
        find("option[value='#{category2.id}']").select_option
        fill_in 'breakdown_name', with: '水道代'
        click_button '更新する'
      end

      expect(page).to have_content '内訳を編集しました'

      within all('.breakdown-item-component')[0] do
        expect(page).to have_css '.fa-minus-square'
        expect(page).to have_content '光熱費'
        expect(page).to have_content '電気代'
      end
      within all('.breakdown-item-component')[1] do
        expect(page).to have_css '.fa-minus-square'
        expect(page).to have_content '光熱費'
        expect(page).to have_content '水道代'
      end
    end
  end

  context 'name is empty' do
    it 'raise a validation error' do
      within all('.breakdown-item-component')[1] do
        find('.fa-edit').click
        fill_in 'breakdown_name', with: ''
        click_button '更新する'
      end
      expect(page).to have_content '内訳を入力してください'
    end
  end

  context 'Cancel' do
    it 'cancel without updating' do
      within all('.breakdown-item-component')[1] do
        find('.fa-edit').click
        find('.fa-times').click

        expect(page).to have_no_css '.form-control'
      end
    end

    it 'cancel with updating' do
      within all('.breakdown-item-component')[1] do
        find('.fa-edit').click
        fill_in 'breakdown_name', with: 'ポイント還元'
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

      within all('.breakdown-item-component')[1] do
        find('.fa-times').click
      end
      within '.modal-body' do
        expect(page).to have_content '更新を取り消しますか？'
      end
      within '.modal-footer' do
        click_button '取り消す'
      end
      within all('.breakdown-item-component')[1] do
        expect(page).to have_no_css '.form-control'
        expect(page).to have_css '.fa-plus-square'
        expect(page).to have_content '臨時収入'
        expect(page).to have_content '月謝'
      end
    end
  end
end
