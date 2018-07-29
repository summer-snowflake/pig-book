# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Template, type: :model do
  describe 'relationship' do
    it { is_expected.to belong_to(:category) }
    it { is_expected.to belong_to(:breakdown).optional }
    it { is_expected.to belong_to(:tag).optional }
  end

  describe 'validation' do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_length_of(:name).is_at_most(250) }
    it { is_expected.to validate_presence_of(:charge) }
    it do
      is_expected.to validate_numericality_of(:charge)
        .is_greater_than_or_equal_to(0)
    end
    it { is_expected.to validate_length_of(:memo).is_at_most(250) }
  end
end
