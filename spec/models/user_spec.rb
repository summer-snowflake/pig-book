# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'relationship' do
    it { is_expected.to have_many(:categories).dependent(:destroy) }
    it { is_expected.to have_many(:places).dependent(:destroy) }
    it { is_expected.to have_many(:breakdowns).through(:categories) }
    it { is_expected.to have_many(:templates).through(:categories) }
    it { is_expected.to have_many(:tags).dependent(:destroy) }
    it { is_expected.to have_many(:records).dependent(:destroy) }
    it { is_expected.to have_many(:monthly_balance_tables).dependent(:destroy) }
    it { is_expected.to have_many(:events).dependent(:destroy) }
    it { is_expected.to have_many(:import_histories).dependent(:destroy) }
    it { is_expected.to have_one(:admin).dependent(:destroy) }
    it { is_expected.to have_one(:profile).dependent(:destroy) }
  end

  describe 'validation' do
    it do
      is_expected.to validate_uniqueness_of(:authentication_token).allow_nil
    end
  end

  describe '#base_setting' do
    let(:user) { create(:user, confirmed_at: Time.zone.yesterday) }
    subject { user.base_setting }

    it 'user profile exist.' do
      expect(subject).not_to be_nil
      expect(user.profile).not_to be_nil
    end
  end

  describe '#recently_used_categories' do
    let!(:user) { create(:user) }
    let!(:category1) { create(:category, user: user, name: 'かてごり１') }
    let!(:category2) { create(:category, user: user, name: 'かてごり２') }
    let!(:category3) { create(:category, user: user, name: 'かてごり３') }
    let!(:record1) { create(:record, user: user, category: category1) }
    let!(:record2) { create(:record, user: user, category: category1) }
    let!(:record3) { create(:record, user: user, category: category2) }
    subject { user.recently_used_categories }

    it { is_expected.to eq [category2, category1] }
  end
end
