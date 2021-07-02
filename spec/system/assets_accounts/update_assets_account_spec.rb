# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Update assets account', type: :system, js: true do
  let!(:user) { create(:user, :active) }
  let!(:assets_account1) { create(:assets_account, user: user, position: 1) }
  let!(:assets_account2) { create(:assets_account, user: user, position: 2) }

  before do
    sign_in user
  end

  it 'Update Assets Account by clicking checkbox' do
    within all('.assets-account-item-component')[0] do
      find('.check-box-component').click
    end

    expect(page).to have_content '預金の種類を更新しました'
  end

  it 'Update Assets Account by edit modal' do
    within all('.assets-account-item-component')[0] do
      find('.fa-edit').click
    end

    fill_in 'assets_account_name', with: '△△銀行'
    fill_in 'assets_account_money', with: '200000'
    click_button '設定する'

    expect(page).to have_content '預金の種類を更新しました'

    within all('.assets-account-item-component')[0] do
      expect(page).to have_content '△△銀行'
      expect(page).to have_content '¥200,000'
    end
  end
end
