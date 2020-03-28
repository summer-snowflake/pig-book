# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  it { is_expected.to have_one(:admin).dependent(:destroy) }
  it { is_expected.to have_one(:profile).dependent(:destroy) }
  it { is_expected.to have_many(:categories).dependent(:destroy) }
  it { is_expected.to have_many(:breakdowns).dependent(:destroy) }
  it { is_expected.to have_many(:places).dependent(:destroy) }
  it { is_expected.to have_many(:records).dependent(:destroy) }
  it { is_expected.to have_many(:tally_events).dependent(:destroy) }
  it { is_expected.to have_many(:monthly_balance_tables).dependent(:destroy) }
  it do
    is_expected.to have_many(:yearly_total_balance_tables).dependent(:destroy)
  end

  describe '#dashboard_years' do
    let!(:user) { create(:user) }
    subject { user.dashboard_years }

    context 'with empty monthly_balance_tables' do
      it 'returns this year' do
        expect(subject).to eq [Time.zone.today.year]
      end
    end

    context 'with some monthly_balance_tables' do
      let!(:monthly_balance_table1) do
        create(:monthly_balance_table, user: user, year: 2012)
      end
      let!(:monthly_balance_table2) do
        create(:monthly_balance_table, user: user, year: 2014)
      end

      it 'returns this year' do
        expect(subject).to eq [*(2012..Time.zone.today.year)].reverse
      end
    end
  end
end
