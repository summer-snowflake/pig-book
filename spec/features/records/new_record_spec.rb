# frozen_string_literal: true

require 'rails_helper'

feature 'New RECORD', js: true do
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

  scenario 'Connect to input page.' do
    visit new_record_path
    within '.card-header' do
      expect(page).to have_content I18n.t('menu.input')
    end
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
        click_on 'button.create'
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

  feature 'Picker Buttons' do
    scenario 'Add a record from category picker button.' do
      add_category(name: '支出カテゴリ')
      add_category(balance_of_payments: true, name: '収入カテゴリ')

      add_record(category_name: '支出カテゴリ')
      within '.picker-form-component' do
        expect(page).to have_content '支出カテゴリ'
        expect(page).to have_no_content '収入カテゴリ'
      end

      add_record(category_name: '収入カテゴリ')
      within '.picker-form-component' do
        expect(page).to have_content '支出カテゴリ'
        expect(page).to have_content '収入カテゴリ'
      end

      within '.picker-form-component' do
        find('.category-picker-component', text: '収入カテゴリ').click
      end
      fill_in 'record_charge', with: '400'
      click_on 'button.create'
      sleep 0.5

      within '.one-day-records-component' do
        records_dom = all('table.table tr.record-component')
        expect(records_dom[0]).to have_content '収入カテゴリ'
        expect(records_dom[0]).to have_content '400'
        expect(records_dom[1]).to have_content '収入カテゴリ'
        expect(records_dom[2]).to have_content '支出カテゴリ'
        expect(records_dom.count).to eq 3
      end
    end
  end

  feature 'Input Form' do
    scenario 'Add a new category.' do
      visit new_record_path

      expect(all('#selectable-categories').map(&:text)).to eq ['- カテゴリ -']

      within '.categories-select-box-component' do
        find('.fas.fa-plus').click
      end

      expect(page).to have_css '.modal-body'
      within '.modal-body' do
        fill_in 'category_name', with: '新しいカテゴリ名'
        click_on '追加する'
      end

      sleep 0.5
      expect(all('#selectable-categories').map(&:text)).to eq ['新しいカテゴリ名']
    end
  end

  after do
    logout(:user)
  end
end
