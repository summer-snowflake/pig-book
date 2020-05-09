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
  it do
    is_expected.to have_many(:monthly_total_balance_tables).dependent(:destroy)
  end
  it do
    is_expected.to have_many(:yearly_total_balance_tables).dependent(:destroy)
  end

  describe '#dashboard_years' do
    let!(:user) { create(:user) }
    let!(:record) do
      create(:record, user: user, published_at: Date.parse('2012/02/02'))
    end
    subject { user.dashboard_years }

    context 'with empty monthly_records' do
      it 'returns this year' do
        expect(subject).to eq [Time.zone.today.year]
      end
    end

    context 'with some monthly_records' do
      let!(:monthly_balance_table1) do
        create(:monthly_record, user: user, year: 2012)
      end
      let!(:monthly_balance_table2) do
        create(:monthly_record, user: user, year: 2014)
      end

      it 'returns this year' do
        expect(subject).to eq [*(2012..Time.zone.today.year)].reverse
      end
    end
  end
end
