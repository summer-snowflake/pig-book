# frozen_string_literal: true

require 'rails_helper'

RSpec.describe YearlyBreakdownBalanceTable, type: :model do
  describe 'relationship' do
    it { is_expected.to belong_to(:category).optional }
    it { is_expected.to belong_to(:breakdown).optional }
  end
end
