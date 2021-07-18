# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Destroy assets account', type: :system, js: true do
  let!(:user) { create(:user, :active) }
  let!(:assets_account1) { create(:assets_account, user: user, position: 1) }
  let!(:assets_account2) { create(:assets_account, user: user, position: 2) }

  before do
    sign_in user
  end

  it 'Destroy Assets Account by destroy modal' do
    within all('.assets-account-item-component')[0] do
      find('.fa-trash').click
    end

    expect(page).to have_content '削除しますか？'

    click_button '削除する'

    expect(page).to have_content '預金の種類を削除しました'
    expect(user.reload.assets_accounts.size).to eq 1
  end
end
