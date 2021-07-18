# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Create Place', type: :system, js: true do
  let!(:user) { create(:user, :active) }

  before do
    sign_in user
    visit places_path
  end

  context 'name is empty' do
    it 'raise a validation error' do
      click_button '追加する'
      expect(page).to have_content 'お店・施設を入力してください'
    end
  end

  context 'params are valid' do
    it 'create place' do
      fill_in 'place_name', with: 'スーパー'
      click_button '追加する'

      expect(page).to have_content 'お店・施設を追加しました'
      within all('.place-item-component')[0] do
        expect(page).to have_content 'スーパー'
      end

      expect(page).to have_content '1 / 20'
    end
  end
end
