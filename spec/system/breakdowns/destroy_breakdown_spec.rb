# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Destroy Breakdown', type: :system, js: true do
  let!(:user) { create(:user, :active) }
  let!(:category1) { create(:category, :income, user: user, name: '臨時収入') }
  let!(:category2) { create(:category, user: user, name: '光熱費') }
  let!(:breakdown1) { create(:breakdown, user: user, category: category1, name: '月謝') }
  let!(:breakdown2) { create(:breakdown, user: user, category: category2, name: '電気代') }

  before do
    sign_in user
    visit breakdowns_path
  end

  context 'breakdown is not in use' do
    it 'destroy breakdown' do
      within all('.breakdown-item-component')[1] do
        find('.fa-trash').click
      end
      within '.modal-body' do
        click_button '削除する'
      end
      expect(page).to have_content '内訳を削除しました'

      within all('.breakdown-item-component')[0] do
        expect(page).to have_css '.fa-minus-square'
        expect(page).to have_content '光熱費'
        expect(page).to have_content '電気代'
      end
      expect(page).to have_no_content '臨時収入'
      expect(page).to have_no_content '月謝'
    end
  end
end
