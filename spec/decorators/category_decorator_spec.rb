# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CategoryDecorator do
  describe '#human_balance_of_payments' do
    let!(:category) do
      create(:category, balance_of_payments: balance_of_payments)
    end
    let(:balance_of_payments) { false }
    subject { category.decorate.human_balance_of_payments }

    context 'category balance of payments is true' do
      let(:balance_of_payments) { true }
      it { is_expected.to eq I18n.t('label.income') }
    end

    context 'category balance of payments is false' do
      let(:balance_of_payments) { false }
      it { is_expected.to eq I18n.t('label.expenditure') }
    end
  end
end
