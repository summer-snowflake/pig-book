# frozen_string_literal: true

require 'rails_helper'

feature 'LIST', js: true do
  let!(:user) { create(:user) }

  background do
    Timecop.travel(Time.local(2018, 10, 10, 0, 0, 0))
    sign_in(user)
  end

  scenario 'Link to list page' do
    visit root_path
    click_link I18n.t('menu.list')
    within '.card-header' do
      expect(page).to have_content I18n.t('menu.list')
    end
  end

  scenario 'Connect to list page.' do
    visit records_path
    within '.card-header' do
      expect(page).to have_content I18n.t('menu.list')
    end
  end

  context 'There are some records.' do
    let!(:category1) { create(:category, user: user, name: '消耗品費') }
    let!(:category2) { create(:category, user: user, name: '食費') }
    let!(:breakdown1) { create(:breakdown, category: category1, name: '日用品') }
    let!(:breakdown2) { create(:breakdown, category: category2, name: '朝食') }
    let!(:record1) do
      create(:record,
             user: user, category: category1, breakdown: breakdown1,
             published_at: Time.zone.today)
    end
    let!(:record2) do
      create(:record,
             user: user, category: category2, breakdown: breakdown2,
             published_at: Time.zone.today.beginning_of_month)
    end
    let!(:record3) do
      create(:record,
             user: user, category: category1, breakdown: breakdown1,
             published_at: 1.month.ago)
    end
    let!(:record4) do
      create(:record,
             user: user, category: category2, breakdown: breakdown2,
             published_at: 1.year.ago)
    end

    context 'when visit records list' do
      background do
        visit records_path
      end

      scenario 'Display the records of the current month.' do
        within '.records-list-title' do
          expect(page).to have_content "#{Time.zone.today.year}年"
          expect(page).to have_content "#{Time.zone.today.month}月"
        end

        within '.records-tag-component' do
          expect(page).to have_content "#{Time.zone.today.year}年"
          expect(page).to have_content "#{Time.zone.today.month}月"
        end

        within '.records-component' do
          expect(page).to have_css('.record-component', count: 2)

          within all('.record-component')[0] do
            expect(page).to have_content '消耗品費'
            expect(page).to have_content '日用品'
            expect(page).to have_no_content '食費'
            expect(page).to have_no_content '朝食'
          end
          within all('.record-component')[1] do
            expect(page).to have_content '食費'
            expect(page).to have_content '朝食'
            expect(page).to have_no_content '消耗品費'
            expect(page).to have_no_content '日用品'
          end
        end
      end

      scenario 'Display the records of the last month.' do
        find('.fas.fa-chevron-left').click

        within '.records-list-title' do
          expect(page).to have_content "#{Time.zone.today.year}年"
          expect(page).to have_content "#{Time.zone.today.month - 1}月"
        end

        within '.records-tag-component' do
          expect(page).to have_content "#{Time.zone.today.year}年"
          expect(page).to have_content "#{Time.zone.today.month - 1}月"
        end

        within '.records-component' do
          expect(page).to have_css('.record-component', count: 1)

          within all('.record-component')[0] do
            expect(page).to have_content '消耗品費'
            expect(page).to have_content '日用品'
            expect(page).to have_no_content '食費'
            expect(page).to have_no_content '朝食'
          end
        end
      end

      scenario 'Display the records of the next month.' do
        find('.fas.fa-chevron-right').click

        within '.records-list-title' do
          expect(page).to have_content "#{Time.zone.today.year}年"
          expect(page).to have_content "#{Time.zone.today.month + 1}月"
        end

        within '.records-tag-component' do
          expect(page).to have_content "#{Time.zone.today.year}年"
          expect(page).to have_content "#{Time.zone.today.month + 1}月"
        end

        expect(page).to have_no_css '.record-component'
      end
    end

    context 'when remove month search tag' do
      background do
        visit records_path
        within '.records-tag-component' do
          find('.fa-times').click
        end
      end

      scenario 'Display the records of the current month.' do
        within '.records-list-title' do
          expect(page).to have_content "#{Time.zone.today.year}年"
          expect(page).to have_no_content "#{Time.zone.today.month}月"
        end

        within '.records-tag-component' do
          expect(page).to have_content "#{Time.zone.today.year}年"
          expect(page).to have_no_content "#{Time.zone.today.month}月"
        end

        within '.records-component' do
          expect(page).to have_css('.record-component', count: 3)

          within all('.record-component')[0] do
            expect(page).to have_content '消耗品費'
            expect(page).to have_content '日用品'
            expect(page).to have_no_content '食費'
            expect(page).to have_no_content '朝食'
          end
          within all('.record-component')[1] do
            expect(page).to have_content '食費'
            expect(page).to have_content '朝食'
            expect(page).to have_no_content '消耗品費'
            expect(page).to have_no_content '日用品'
          end
          within all('.record-component')[2] do
            expect(page).to have_content '消耗品費'
            expect(page).to have_content '日用品'
            expect(page).to have_no_content '食費'
            expect(page).to have_no_content '朝食'
          end
        end
      end

      scenario 'Display the records of the last year.' do
        find('.fas.fa-chevron-left').click

        within '.records-list-title' do
          expect(page).to have_content "#{Time.zone.today.year - 1}年"
          expect(page).to have_no_content '月'
        end

        within '.records-tag-component' do
          expect(page).to have_content "#{Time.zone.today.year - 1}年"
          expect(page).to have_no_content '月'
        end

        within '.records-component' do
          expect(page).to have_css('.record-component', count: 1)

          within '.record-component' do
            expect(page).to have_content '食費'
            expect(page).to have_content '朝食'
            expect(page).to have_no_content '消耗品費'
            expect(page).to have_no_content '日用品'
          end
        end
      end

      scenario 'Display the records of the next year.' do
        find('.fas.fa-chevron-right').click

        within '.records-list-title' do
          expect(page).to have_content "#{Time.zone.today.year + 1}年"
          expect(page).to have_no_content '月'
        end

        within '.records-tag-component' do
          expect(page).to have_content "#{Time.zone.today.year + 1}年"
          expect(page).to have_no_content '月'
        end

        expect(page).to have_no_css '.record-component'
      end
    end
  end

  after do
    logout(:user)
    Timecop.return
  end
end
