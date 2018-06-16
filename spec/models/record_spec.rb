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
    it { is_expected.to validate_presence_of(:published_on) }
    it { is_expected.to validate_presence_of(:charge) }
    it { is_expected.to validate_numericality_of(:charge).only_integer }
    it { is_expected.to validate_length_of(:memo).is_at_most(250) }
  end
end
