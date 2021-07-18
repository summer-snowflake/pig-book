# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Destroy Tag', type: :system, js: true do
  let!(:user) { create(:user, :active) }
  let!(:tag1) { create(:tag, user: user, name: '経費') }
  let!(:tag2) { create(:tag, user: user, name: 'クレジットカード') }

  before do
    sign_in user
    visit tags_path
  end

  context 'tag is not in use' do
    it 'destroy tag' do
      within all('.tag-item-component')[1] do
        find('.fa-trash').click
      end
      within '.modal-body' do
        click_button '削除する'
      end
      expect(page).to have_content 'ラベルを削除しました'

      within all('.tag-item-component')[0] do
        expect(page).to have_content 'クレジットカード'
      end
      expect(page).to have_no_content '経費'
    end
  end
end
