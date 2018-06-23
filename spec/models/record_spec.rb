# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Record, type: :model do
  describe 'relationship' do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to belong_to(:category) }
    it { is_expected.to belong_to(:breakdown).optional }
    it { is_expected.to belong_to(:place).optional }
  end

  describe 'validation' do
    it { is_expected.to validate_presence_of(:published_at) }
    it { is_expected.to validate_presence_of(:charge) }
    it do
      is_expected.to validate_numericality_of(:charge)
        .is_greater_than_or_equal_to(0)
    end
    it { is_expected.to validate_length_of(:memo).is_at_most(250) }
  end

  describe '#currency' do
    it { is_expected.to define_enum_for(:currency).with_values(%i[yen dollar]) }
  end
end
