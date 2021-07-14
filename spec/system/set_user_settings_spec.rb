# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Settings', type: :system, js: true do
  let!(:user) { create(:user, :active) }

  it 'Display settings page' do
    sign_in user
    visit settings_path

    within '.user-settings-card-component' do
      expect(page).to have_content '基本設定'
      expect(page).to have_content '使用言語'
      expect(page).to have_content '通貨の単位'
    end
    within '.options-settings-card-component' do
      expect(page).to have_content 'オプション設定'
      expect(page).to have_content 'デイリーチャート'
      expect(page).to have_content '無制限利用'
      expect(page).to have_content '貯金箱'
    end
    within '.memo-card-component' do
      expect(page).to have_content 'メモ'
    end
  end

  describe 'user settings' do
    before do
      sign_in user
      visit settings_path
    end

    it 'update locale' do
      # 英語に設定
      within '.user-settings-card-component' do
        find(:css, 'label[for=profile_locale_en]').set(true)
      end
      expect(page).to have_content 'Updated successfully'
      expect(user.reload.profile.locale).to eq 'en'

      within '.user-settings-card-component' do
        expect(page).to have_content 'Base Setting'
        expect(page).to have_content 'Language'
        expect(page).to have_content 'Currency'
      end
      within '.options-settings-card-component' do
        expect(page).to have_content 'Options Setting'
        # NOTE: オプション名を英語に変換できるようにする
        expect(page).to have_content 'デイリーチャート'
        expect(page).to have_content '無制限利用'
        expect(page).to have_content '貯金箱'
      end
      within '.memo-card-component' do
        expect(page).to have_content 'Note'
      end

      # 日本語に設定
      within '.user-settings-card-component' do
        find(:css, 'label[for=profile_locale_ja]').set(true)
      end
      expect(page).to have_content '更新しました'
      expect(user.reload.profile.locale).to eq 'ja'

      within '.user-settings-card-component' do
        expect(page).to have_content '基本設定'
        expect(page).to have_content '使用言語'
        expect(page).to have_content '通貨の単位'
      end
      within '.options-settings-card-component' do
        expect(page).to have_content 'オプション設定'
        expect(page).to have_content 'デイリーチャート'
        expect(page).to have_content '無制限利用'
        expect(page).to have_content '貯金箱'
      end
      within '.memo-card-component' do
        expect(page).to have_content 'メモ'
      end
    end

    it 'update currency' do
      within '.user-settings-card-component' do
        find(:css, 'label[for=profile_currency_dollar]').set(true)
      end
      expect(page).to have_content '更新しました'
      expect(user.reload.profile.currency).to eq 'dollar'

      within '.user-settings-card-component' do
        find(:css, 'label[for=profile_currency_yen]').set(true)
      end
      expect(page).to have_content '更新しました'
      expect(user.reload.profile.currency).to eq 'yen'
    end
  end

  describe 'option settings' do
    context 'user is not admin' do
      before do
        sign_in user
        visit settings_path
      end

      it 'not switch on daily-chart option' do
        within '.options-settings-card-component' do
          find(:css, 'label[for=switch-1]').set(true)
        end
        expect(page).to have_content 'デイリーチャートは許可されていません'
        expect(user.reload.daily_option).to be_falsey

        within '.options-settings-card-component' do
          find(:css, 'label[for=switch-2]').set(true)
        end
        expect(page).to have_content '無制限利用は許可されていません'
        expect(user.reload.unlimited_option).to be_falsey

        within '.options-settings-card-component' do
          find(:css, 'label[for=switch-3]').set(true)
        end
        expect(page).to have_content '更新しました'
        expect(user.reload.piggy_bank_option).to be_truthy
      end
    end

    context 'user is not admin' do
      let(:user) { create(:user, :active, :admin) }

      before do
        sign_in user
        visit settings_path
      end

      it 'not switch on daily-chart option' do
        within '.options-settings-card-component' do
          find(:css, 'label[for=switch-1]').set(true)
        end
        expect(page).to have_content '更新しました'
        expect(user.reload.daily_option).to be_truthy

        within '.options-settings-card-component' do
          find(:css, 'label[for=switch-2]').set(true)
        end
        expect(page).to have_content '更新しました'
        expect(user.reload.unlimited_option).to be_truthy

        within '.options-settings-card-component' do
          find(:css, 'label[for=switch-3]').set(true)
        end
        expect(page).to have_content '更新しました'
        expect(user.reload.piggy_bank_option).to be_truthy
      end
    end
  end

  describe 'note' do
    it 'update note' do
      sign_in user
      visit settings_path

      within '.memo-card-component' do
        find('.fa-edit').click
      end

      within '.modal-body' do
        fill_in 'memo', with: 'めもめもめも'
        click_button '更新する'
      end
      expect(page).to have_content '更新しました'

      within '.memo-card-component' do
        expect(page).to have_content 'めもめもめも'
      end
    end
  end
end
