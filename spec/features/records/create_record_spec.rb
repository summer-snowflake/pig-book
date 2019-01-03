# frozen_string_literal: true

require 'rails_helper'

feature 'Create RECORD', js: true do
  let!(:user) { create(:user) }

  background do
    sign_in(user)
  end

  context 'Create a new record.' do
    let!(:category) { create(:category, user: user) }
    let!(:breakdown) { create(:breakdown, category: category) }
    let!(:place) { create(:place, user: user) }
    let!(:categorized_place) do
      create(:categorized_place, category: category, place: place)
    end

    scenario 'Save record with not changed published_on' do
      add_record(category_name: category.name, breakdown_name: breakdown.name,
                 place_name: place.name, charge: 9000, memo: 'メモ')
      sleep 0.5
      expect(find('input[name=record_charge]').value).to eq ''
      within '.one-day-records-component .card-body' do
        expect(page).to have_content category.name
        expect(page).to have_content breakdown.name
        expect(page).to have_content place.name
        expect(page).to have_content '9,000'
      end
    end

    scenario 'Save record with changed published_on' do
      visit new_record_path
      within '.date-picker' do
        find('.form-control').click
        find('.react-datepicker__day[aria-label="day-19"]').click
      end
      within '.new-record-form-component' do
        select category.name, from: 'selectable-categories'
        select breakdown.name, from: 'selectable-breakdowns'
        select place.name, from: 'selectable-places'
        fill_in 'record_charge', with: '800'
        fill_in 'record_memo', with: 'メモ'
        click_on '登録する'
      end

      sleep 0.5
      expect(find('input[name=record_charge]').value).to eq ''
      within '.one-day-records-component .card-body' do
        expect(page).to have_content category.name
        expect(page).to have_content breakdown.name
        expect(page).to have_content place.name
        expect(page).to have_content '800'
      end
    end
  end

  after do
    logout(:user)
  end
end
