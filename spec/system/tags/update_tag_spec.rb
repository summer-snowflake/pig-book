# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Update Tag', type: :system, js: true do
  let!(:user) { create(:user, :active) }
  let!(:tag1) { create(:tag, user: user, name: '経費') }
  let!(:tag2) { create(:tag, user: user, name: 'クレジットカード') }

  before do
    sign_in user
    visit tags_path
  end

  it 'display tags' do
    within all('.tag-item-component')[0] do
      expect(page).to have_content 'クレジットカード'
    end
    within all('.tag-item-component')[1] do
      expect(page).to have_content '経費'
    end
  end

  context 'params are valid' do
    it 'update tag' do
      within all('.tag-item-component')[1] do
        find('.fa-edit').click
        fill_in 'tag_name', with: '事業'
        click_button '更新する'
      end

      expect(page).to have_content 'ラベルを編集しました'

      within all('.tag-item-component')[0] do
        expect(page).to have_content 'クレジットカード'
      end
      within all('.tag-item-component')[1] do
        expect(page).to have_content '事業'
      end
    end
  end

  context 'name is empty' do
    it 'raise a validation error' do
      within all('.tag-item-component')[1] do
        find('.fa-edit').click
        fill_in 'tag_name', with: ''
        click_button '更新する'
      end
      expect(page).to have_content 'ラベルを入力してください'
    end
  end

  context 'Cancel' do
    it 'cancel without updating' do
      within all('.tag-item-component')[1] do
        find('.fa-edit').click
        find('.fa-times').click

        expect(page).to have_no_css '.form-control'
      end
    end

    it 'cancel with updating' do
      within all('.tag-item-component')[1] do
        find('.fa-edit').click
        fill_in 'tag_name', with: '事業'
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

      within all('.tag-item-component')[1] do
        find('.fa-times').click
      end
      within '.modal-body' do
        expect(page).to have_content '更新を取り消しますか？'
      end
      within '.modal-footer' do
        click_button '取り消す'
      end
      within all('.tag-item-component')[1] do
        expect(page).to have_no_css '.form-control'
        expect(page).to have_content '経費'
      end
    end
  end
end
