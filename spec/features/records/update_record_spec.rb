# frozen_string_literal: true

require 'rails_helper'

feature 'Update RECORD', js: true do
  let!(:user) { create(:user) }

  background do
    sign_in(user)
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
        expect(page).to have_content '入力する'
      end

      within '.related-records-component .card-body' do
        within "#record-#{record1.id}" do
          expect(page).to have_content '¥100'
        end
        within "#record-#{record2.id}" do
          expect(page).to have_content '¥200'
        end
      end
    end

    scenario 'Update the record charge' do
      within '.related-records-component .card-body' do
        within "#record-#{record2.id}" do
          find('.fa-edit').click
        end
      end

      expect(find('input[name=record_charge]').value).to eq '200'

      fill_in 'record_charge', with: '300'
      click_on '更新する'

      within '.related-records-component .card-body' do
        within "#record-#{record1.id}" do
          expect(page).to have_content '¥100'
        end
        within "#record-#{record2.id}" do
          expect(page).to have_content '¥300'
        end
      end
    end
  end

  after do
    logout(:user)
  end
end
