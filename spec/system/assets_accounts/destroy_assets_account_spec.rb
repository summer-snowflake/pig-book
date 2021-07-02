# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Destroy assets account', type: :system, js: true do
  let!(:user) { create(:user, :active) }
  let!(:assets_account) { create(:assets_account, user: user, name: '△△銀行', money: '200_000') }

  before do
    sign_in user
  end

  it 'Destroy Assets Account by destroy modal' do
    expect(page).to have_content '△△銀行'
    expect(page).to have_content '¥200,000'
    find('.fa-trash').click

    click_button '削除する'

    expect(page).to have_content '預金の種類を削除しました'

    expect(page).to have_no_content '△△銀行'
    expect(page).to have_no_content '¥200,000'
  end
end
