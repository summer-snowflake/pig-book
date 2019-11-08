# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Profile, type: :model do
  describe 'relationship' do
    it { is_expected.to belong_to(:user) }
  end

  describe 'validation' do
    it { is_expected.to validate_length_of(:memo).is_at_most(1000) }
  end

  describe '#locale' do
    it { is_expected.to define_enum_for(:locale).with_values(%i[ja en]) }
  end

  describe '#currency' do
    it { is_expected.to define_enum_for(:currency).with_values(%i[yen dollar]) }
  end
end
