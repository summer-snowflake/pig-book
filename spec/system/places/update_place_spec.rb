# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Update Place', type: :system, js: true do
  let!(:user) { create(:user, :active) }
  let!(:place1) { create(:place, user: user, name: 'スーパー') }
  let!(:place2) { create(:place, user: user, name: 'コンビニ') }

  before do
    sign_in user
    visit places_path
  end

  it 'display places' do
    within all('.place-item-component')[0] do
      expect(page).to have_content 'コンビニ'
    end
    within all('.place-item-component')[1] do
      expect(page).to have_content 'スーパー'
    end
  end

  context 'params are valid' do
    it 'update place' do
      within all('.place-item-component')[1] do
        find('.fa-edit').click
        fill_in 'place_name', with: 'ネットスーパー'
        click_button '更新する'
      end

      expect(page).to have_content 'お店・施設を編集しました'

      within all('.place-item-component')[0] do
        expect(page).to have_content 'コンビニ'
      end
      within all('.place-item-component')[1] do
        expect(page).to have_content 'ネットスーパー'
      end
    end
  end

  context 'name is empty' do
    it 'raise a validation error' do
      within all('.place-item-component')[1] do
        find('.fa-edit').click
        fill_in 'place_name', with: ''
        click_button '更新する'
      end
      expect(page).to have_content 'お店・施設を入力してください'
    end
  end

  context 'Cancel' do
    it 'cancel without updating' do
      within all('.place-item-component')[1] do
        find('.fa-edit').click
        find('.fa-times').click

        expect(page).to have_no_css '.form-control'
      end
    end

    it 'cancel with updating' do
      within all('.place-item-component')[1] do
        find('.fa-edit').click
        fill_in 'place_name', with: 'モール'
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

      within all('.place-item-component')[1] do
        find('.fa-times').click
      end
      within '.modal-body' do
        expect(page).to have_content '更新を取り消しますか？'
      end
      within '.modal-footer' do
        click_button '取り消す'
      end
      within all('.place-item-component')[1] do
        expect(page).to have_no_css '.form-control'
        expect(page).to have_content 'スーパー'
      end
    end
  end
end
