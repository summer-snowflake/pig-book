# frozen_string_literal: true

require 'rails_helper'

RSpec.describe MonthlyBalanceTable, type: :model do
  describe 'relationship' do
    it { is_expected.to belong_to(:user) }
  end

  describe 'validation' do
    it { is_expected.to validate_presence_of(:year) }
    it { is_expected.to validate_presence_of(:month) }
  end

  describe '#target_years' do
    let!(:user) { create(:user) }

    subject { user.monthly_balance_tables.target_years }

    context 'when exist data with some years' do
      let!(:monthly_balance_table1) do
        create(:monthly_balance_table, user: user, year: 2017, month: 10)
      end
      let!(:monthly_balance_table2) do
        create(:monthly_balance_table, user: user, year: 2019, month: 3)
      end

      it 'return some years array' do
        expect(subject).to eq [*2017..Time.zone.today.year].reverse
      end
    end

    context 'when not exist data' do
      it 'return this year array' do
        expect(subject).to eq [Time.zone.today.year]
      end
    end
  end

  describe '#the_year' do
    let!(:user) { create(:user) }
    let!(:monthly_balance_table1) do
      create(:monthly_balance_table, user: user, year: 2017, month: 10)
    end
    let!(:monthly_balance_table2) do
      create(:monthly_balance_table, user: user, year: 2019, month: 3)
    end
    let!(:monthly_balance_table3) do
      create(:monthly_balance_table, user: user, year: 2017, month: 3)
    end
    subject { user.monthly_balance_tables.the_year(year) }

    context 'the year is 2017' do
      let(:year) { '2017' }

      it 'return some data of 2017' do
        expect(subject).to eq [monthly_balance_table3, monthly_balance_table1]
      end
    end

    context 'the year is 2018' do
      let(:year) { '2018' }

      it 'return some data of 2018' do
        expect(subject).to eq []
      end
    end

    context 'the year is 2019' do
      let(:year) { '2019' }

      it 'return some data of 2019' do
        expect(subject).to eq [monthly_balance_table2]
      end
    end
  end
end
