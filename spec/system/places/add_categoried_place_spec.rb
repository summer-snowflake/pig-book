# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Add Categorized Place', type: :system, js: true do
  let!(:user) { create(:user, :active) }
  let!(:category1) { create(:category, user: user, name: '飲食費') }
  let!(:category2) { create(:category, user: user, name: '旅費交通費') }
  let!(:category3) { create(:category, user: user, name: '消耗品費') }
  let!(:place1) { create(:place, user: user, name: 'スーパー') }
  let!(:place2) { create(:place, user: user, name: 'コンビニ') }

  before do
    sign_in user
    visit places_path
  end

  it 'add categorized place' do
    within all('.place-item-component')[0] do
      find('.plus-button-component').click
    end
    expect(page).to have_css '.modal-body'
    within '.modal-body' do
      expect(page).to have_content '利用するカテゴリを選択してください（複数可）'

      expect(page).to have_content '飲食費'
      expect(page).to have_content '旅費交通費'
      expect(page).to have_content '消耗品費'

      find(:css, "label[for=category-#{category1.id}]").set(true)
      find(:css, "label[for=category-#{category3.id}]").set(true)
    end

    within '.modal-footer' do
      click_button '設定する'
    end

    within all('.place-item-component')[0] do
      expect(page).to have_content '飲食費'
      expect(page).to have_no_content '旅費交通費'
      expect(page).to have_content '消耗品費'
    end
    within all('.place-item-component')[1] do
      expect(page).to have_no_content '飲食費'
      expect(page).to have_no_content '旅費交通費'
      expect(page).to have_no_content '消耗品費'
    end
  end
end
