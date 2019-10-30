# frozen_string_literal: true

require 'rails_helper'

feature 'MYPAGE', js: true do
  let!(:user) { create(:user) }

  background do
    sign_in(user)
  end

  after do
    logout(:user)
  end

  scenario 'Link to mypage.' do
    visit root_path
    click_link user.email
    expect(page).to have_content I18n.t('title.recent_list')
  end

  scenario 'Display the mypage' do
    visit mypage_path
    expect(page).to have_content I18n.t('menu.mypage_top')
    expect(page).to have_content I18n.t('title.recent_list')
  end

  context 'When there are some records.' do
    let!(:record1) do
      create(:record, user: user,
                      charge: 2_000, created_at: 2.hours.ago)
    end
    let!(:record2) { create(:record, user: user, charge: 400) }

    scenario 'Display the recently records.' do
      visit mypage_path

      within all('tr.record-component')[0] do
        expect(page).to have_content record2.category.name
        expect(page).to have_content record2.breakdown.name
        expect(page).to have_content '¥400'
      end
      within all('tr.record-component')[1] do
        expect(page).to have_content record1.category.name
        expect(page).to have_content record1.breakdown.name
        expect(page).to have_content '¥2,000'
      end
    end
  end

  describe 'MEMO' do
    background do
      visit mypage_path
    end

    scenario 'Display the memo on mypage' do
      within '.memo-card-component' do
        expect(page).to have_content 'MEMO'
      end
    end

    context 'when update memo' do
      scenario 'Save the memo' do
        within '.memo-card-component' do
          trigger_click('.memo-edit-icon')
          find('.form-control').set('お小遣いに関するメモ')
          click_on '更新する'
        end
        expect(page).to have_content '更新しました'
        within '.memo-card-component' do
          expect(page).to have_css '.memo-edit-icon'
          expect(page).to have_content 'お小遣いに関するメモ'
        end
      end
    end

    context 'when NOT update memo' do
      scenario 'dont Save the memo' do
        within '.memo-card-component' do
          trigger_click('.memo-edit-icon')
          find('.form-control').set('お小遣いに関するメモ')
          click_on 'キャンセル'
        end
        within '.memo-card-component' do
          expect(page).to have_css '.memo-edit-icon'
          expect(page).to have_no_content 'お小遣いに関するメモ'
        end
      end
    end
  end
end
