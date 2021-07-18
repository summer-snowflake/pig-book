# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Create Tag', type: :system, js: true do
  let!(:user) { create(:user, :active) }

  before do
    sign_in user
    visit tags_path
  end

  context 'color code is empty' do
    it 'raise a validation error' do
      fill_in 'tag_name', with: '経費'
      click_button '追加する'
      expect(page).to have_content 'カラーコードを入力してください'
    end
  end

  context 'params are valid' do
    it 'create tag' do
      find('.color-code-box').click
      find('.saturation-white').click
      fill_in 'tag_name', with: '経費'
      click_button '追加する'

      expect(page).to have_content 'ラベルを追加しました'
      within all('.tag-item-component')[0] do
        expect(page).to have_content '経費'
      end

      expect(page).to have_content '1 / 20'
    end
  end
end
