# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'MyPage', type: :system, js: true do
  let!(:user) { create(:user, :active) }

  context 'assets account is empty' do
    it 'Display empty Assets Accounts List' do
      sign_in user

      within '.card-header' do
        expect(page).to have_content '総資産'
      end
      expect(page).to have_content '0 / 10'
    end
  end

  context 'there are some assets accounts' do
    let!(:assets_account1) { create(:assets_account, user: user, position: 1) }
    let!(:assets_account2) { create(:assets_account, user: user, position: 2) }

    it 'Display Assets Accounts Items' do
      sign_in user

      within '.card-header' do
        expect(page).to have_content '総資産'
      end
      expect(page).to have_content '2 / 10'

      within all('.assets-account-item-component')[0] do
        expect(page).to have_content assets_account1.name
        expect(page).to have_content assets_account1.human_charge
        expect(page).to have_content assets_account1.human_updated_at
        expect(page).to have_content assets_account1.from_now
      end
      within all('.assets-account-item-component')[1] do
        expect(page).to have_content assets_account2.name
        expect(page).to have_content assets_account2.human_charge
        expect(page).to have_content assets_account2.human_updated_at
        expect(page).to have_content assets_account2.from_now
      end
    end
  end
end
