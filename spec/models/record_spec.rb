# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Record, type: :model do
  describe 'relationship' do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to belong_to(:category) }
    it { is_expected.to belong_to(:breakdown).optional }
    it { is_expected.to belong_to(:place).optional }
    it { is_expected.to have_one(:import_history) }
    it { is_expected.to have_many(:tagged_records) }
  end

  describe 'validation' do
    it { is_expected.to validate_presence_of(:published_at) }
    it { is_expected.to validate_presence_of(:charge) }
    it do
      is_expected.to validate_numericality_of(:charge)
        .is_greater_than_or_equal_to(0)
    end
    it { is_expected.to validate_length_of(:memo).is_at_most(250) }

    describe '#point_is_less_than_or_equal_to_charge' do
      subject { build(:record, charge: 100, point: point) }

      context 'point is greater than charge' do
        let(:point) { 101 }
        it 'has errors messages' do
          subject.invalid?
          expect(subject.errors.messages[:point]).to eq [
            I18n.t('messages.errors.point.less_than_or_equal_to', count: 100)
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
  end

  describe '#currency' do
    it { is_expected.to define_enum_for(:currency).with_values(%i[yen dollar]) }
  end
end
