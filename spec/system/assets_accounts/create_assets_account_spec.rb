# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Create assets account', type: :system, js: true do
  let!(:user) { create(:user, :active) }

  before do
    sign_in user
  end

  it 'Create Assets Account' do
    click_on '預金の種類を追加'

    fill_in 'assets_account_name', with: '○○銀行'
    fill_in 'assets_account_money', with: '300000'
    click_button '設定する'

    expect(page).to have_content '預金の種類を登録しました'

    expect(page).to have_content '○○銀行'
    expect(page).to have_content '¥300,000'
  end

  context 'when name is blank' do
    it 'Create Assets Account' do
      click_on '預金の種類を追加'

      click_button '設定する'

      expect(page).to have_content '預金の種類を入力してください'
    end
  end
end
