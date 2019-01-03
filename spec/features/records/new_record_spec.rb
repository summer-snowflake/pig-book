# frozen_string_literal: true

require 'rails_helper'

feature 'New RECORD', js: true do
  let!(:user) { create(:user) }

  background do
    sign_in(user)
  end

  scenario 'Link to input page' do
    visit root_path
    click_link '入力する'
    within '.card-header' do
      expect(page).to have_content '入力する'
    end
  end

  scenario 'Connect to input page.' do
    visit new_record_path
    within '.card-header' do
      expect(page).to have_content '入力する'
    end
  end

  after do
    logout(:user)
  end
end
