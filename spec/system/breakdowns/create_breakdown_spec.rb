# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Create Breakdown', type: :system, js: true do
  let!(:user) { create(:user, :active) }
  let!(:category) { create(:category, user: user, name: '光熱費') }

  before do
    sign_in user
    visit breakdowns_path
  end

  context 'category and name are empty' do
    it 'raise a validation error' do
      click_button '追加する'
      expect(page).to have_content 'カテゴリを入力してください'
      expect(page).to have_content '内訳を入力してください'
    end
  end

  context 'params are valid' do
    it 'create breakdown' do
      find("option[value='#{category.id}']").select_option
      fill_in 'breakdown_name', with: '電気代金'
      click_button '追加する'

      expect(page).to have_content '内訳を追加しました'
      within all('.breakdown-item-component')[0] do
        expect(page).to have_css '.fa-minus-square'
        expect(page).to have_content '光熱費'
        expect(page).to have_content '電気代金'
      end

      expect(page).to have_content '1 / 20'
    end
  end
end
