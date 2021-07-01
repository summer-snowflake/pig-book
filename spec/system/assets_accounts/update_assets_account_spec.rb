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
end
