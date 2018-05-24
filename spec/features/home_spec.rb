# frozen_string_literal: true

require 'rails_helper'

feature 'HOME', js: true do
  scenario 'Connect to home page.' do
    visit root_path
    expect(page).to have_content 'welcome'
  end
end
