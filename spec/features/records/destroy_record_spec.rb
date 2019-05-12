# frozen_string_literal: true

require 'rails_helper'

feature 'Destroy RECORD', js: true do
  let!(:user) { create(:user) }

  background do
    sign_in(user)
  end

  context 'there are some records' do
    let!(:record1) do
      create(:record, user: user, charge: 100, published_at: Time.zone.today)
        .decorate
    end
    let!(:record2) do
      create(:record, user: user, charge: 200, published_at: Time.zone.today)
        .decorate
    end

    background do
      visit new_record_path
    end

    scenario 'Destroy the target record' do
      within '.related-records-component .card-body' do
        within "#record-#{record2.id}" do
          find('i.far.fa-trash-alt').click
        end
      end

      # 閉じる
      expect(page).to have_css '.modal-body'
      within '.modal-body' do
        expect(page).to have_content '削除してもよろしいですか？'
      end
      within '.modal-footer' do
        find('button#cancel').click
      end

      within '.related-records-component .card-body' do
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
      within '.related-records-component .card-body' do
        expect(page).to have_no_content record2.human_charge
      end
    end
  end

  after do
    logout(:user)
  end
end
