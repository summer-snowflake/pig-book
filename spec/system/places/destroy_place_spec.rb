# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Destroy Place', type: :system, js: true do
  let!(:user) { create(:user, :active) }
  let!(:place1) { create(:place, user: user, name: 'スーパー') }
  let!(:place2) { create(:place, user: user, name: 'コンビニ') }

  before do
    sign_in user
    visit places_path
  end

  context 'place is not in use' do
    it 'destroy place' do
      within all('.place-item-component')[1] do
        find('.fa-trash').click
      end
      within '.modal-body' do
        click_button '削除する'
      end
      expect(page).to have_content 'お店・施設を削除しました'

      within all('.place-item-component')[0] do
        expect(page).to have_content 'コンビニ'
      end
      expect(page).to have_no_content 'スーパー'
    end
  end
end
