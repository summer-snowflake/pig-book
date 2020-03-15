# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Record, type: :model do
  it { is_expected.to belong_to(:user) }
  it { is_expected.to belong_to(:category) }
  it { is_expected.to belong_to(:breakdown).optional(true) }
  it { is_expected.to belong_to(:place).optional(true) }

  it { is_expected.to validate_presence_of(:published_at) }
  it { is_expected.to validate_presence_of(:currency) }
  it { is_expected.to validate_presence_of(:charge) }
  it do
    is_expected.to validate_numericality_of(:charge).is_greater_than(0)
  end
  it { is_expected.to validate_length_of(:memo).is_at_most(250) }

  describe '#point_is_less_than_or_equal_to_charge' do
    subject { build(:record, charge: 100, point: point) }

    context 'point is greater than charge' do
      let(:point) { 101 }
      it 'has errors messages' do
        subject.invalid?
        expect(subject.errors.full_messages).to eq [
          'ポイントは100以下の値にしてください'
        ]
      end
    end

    context 'point is not greater than charge' do
      let(:point) { 99 }
      it 'has errors messages' do
        expect(subject.invalid?).to be_falsey
      end
    end
  end

  describe '#currency' do
    it { is_expected.to define_enum_for(:currency).with_values(%i[yen dollar]) }
  end
end
