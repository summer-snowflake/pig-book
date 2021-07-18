# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Destroy Category', type: :system, js: true do
  let!(:user) { create(:user, :active) }
  let!(:category1) { create(:category, :income, user: user, name: '臨時収入') }
  let!(:category2) { create(:category, user: user, name: '光熱費') }

  before do
    sign_in user
    visit categories_path
  end

  context 'category is not in use' do
    it 'destroy category' do
      within all('.category-item-component')[1] do
        find('.fa-trash').click
      end
      within '.modal-body' do
        click_button '削除する'
      end
      expect(page).to have_content 'カテゴリを削除しました'

      within all('.category-item-component')[0] do
        expect(page).to have_css '.fa-minus-square'
        expect(page).to have_content '光熱費'
      end
      expect(page).to have_no_content '臨時収入'
    end
  end
end
