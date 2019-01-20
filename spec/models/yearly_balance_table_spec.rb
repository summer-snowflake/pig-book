# frozen_string_literal: true

require 'rails_helper'

RSpec.describe YearlyBalanceTable, type: :model do
  describe 'relationship' do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to belong_to(:category).optional }
  end

  describe 'validation' do
    it { is_expected.to validate_presence_of(:year) }
  end
end
