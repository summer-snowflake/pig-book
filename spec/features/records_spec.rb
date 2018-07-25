# frozen_string_literal: true

require 'rails_helper'

feature 'RECORD', js: true do
  let!(:user) { create(:user) }

  background do
    sign_in(user)
  end

  scenario 'Link to input page' do
    visit root_path
    click_link I18n.t('menu.input')
    within '.card-header' do
      expect(page).to have_content I18n.t('menu.input')
    end
  end

  scenario 'Link to list page' do
    visit root_path
    click_link I18n.t('menu.list')
    within '.card-header' do
      expect(page).to have_content I18n.t('menu.list')
    end
  end

  scenario 'Connect to input page.' do
    visit new_record_path
    within '.card-header' do
      expect(page).to have_content I18n.t('menu.input')
    end
  end

  scenario 'Connect to list page.' do
    visit records_path
    within '.card-header' do
      expect(page).to have_content I18n.t('menu.list')
    end
  end

  context 'Create new record.' do
    let!(:category) { create(:category, user: user) }
    let!(:breakdown) { create(:breakdown, category: category) }
    let!(:place) { create(:place, user: user) }
    let!(:categorized_place) do
      create(:categorized_place, category: category, place: place)
    end

    scenario 'with not changed published_on' do
      visit new_record_path
      select category.name, from: 'selectable-categories'
      select breakdown.name, from: 'selectable-breakdowns'
      select place.name, from: 'selectable-places'
      fill_in 'record_charge', with: '9000'
      fill_in 'record_memo', with: 'メモ'
      click_on 'button.create'

      expect(find('input[name=record_charge]').value).to eq ''
      within '.one-day-records-component .card-body' do
        expect(page).to have_content category.name
        expect(page).to have_content breakdown.name
        expect(page).to have_content place.name
        expect(page).to have_content '9,000'
      end
    end
  end

  context 'there are some records' do
    let!(:record1) do
      create(:record, user: user, charge: 100, published_at: Time.zone.today)
    end
    let!(:record2) do
      create(:record, user: user, charge: 200, published_at: Time.zone.today)
    end

    background do
      visit new_record_path
    end

    scenario 'Display the records' do
      within '.card-header' do
        expect(page).to have_content I18n.t('menu.input')
      end

      within '.one-day-records-component .card-body' do
        within "#record-#{record1.id}" do
          expect(page).to have_content record1.decorate.human_charge
        end
        within "#record-#{record2.id}" do
          expect(page).to have_content record2.decorate.human_charge
        end
      end
    end

    scenario 'Destroy the target record' do
      within '.one-day-records-component .card-body' do
        within "#record-#{record2.id}" do
          find('i.far.fa-trash-alt').click
        end
      end

      # 閉じる
      expect(page).to have_css '.modal-body'
      within '.modal-body' do
        # TODO: I18nを適用する
        expect(page).to have_content '削除してもよろしいですか？'
      end
      within '.modal-footer' do
        find('button#cancel').click
      end

      within '.one-day-records-component .card-body' do
        within "#record-#{record2.id}" do
          find('.far.fa-trash-alt').click
        end
      end

      # 削除
      expect(page).to have_css '.modal-body'
      within '.modal-body' do
        expect(page).to have_content '削除してもよろしいですか？'
      end
      within '.modal-footer' do
        find('button#submit').click
      end
      within '.one-day-records-component .card-body' do
        expect(page).to have_no_content record2.decorate.human_charge
      end
    end
  end

  after do
    logout(:user)
  end
end
