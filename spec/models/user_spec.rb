# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'relationship' do
    it { is_expected.to have_many(:categories).dependent(:destroy) }
    it { is_expected.to have_many(:places).dependent(:destroy) }
    it { is_expected.to have_many(:breakdowns).dependent(:destroy) }
    it { is_expected.to have_many(:templates).through(:categories) }
    it { is_expected.to have_many(:tags).dependent(:destroy) }
    it { is_expected.to have_many(:records).dependent(:destroy) }
    it do
      is_expected.to have_many(:yearly_all_balance_tables).dependent(:destroy)
    end
    it do
      is_expected
        .to have_many(:yearly_category_balance_tables).dependent(:destroy)
    end
    it do
      is_expected
        .to have_many(:yearly_breakdown_balance_tables).dependent(:destroy)
    end
    it { is_expected.to have_many(:monthly_balance_tables).dependent(:destroy) }
    it { is_expected.to have_many(:tally_events).dependent(:destroy) }
    it { is_expected.to have_many(:import_histories).dependent(:destroy) }
    it { is_expected.to have_many(:download_files).dependent(:destroy) }
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
end
