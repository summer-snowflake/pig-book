# frozen_string_literal: true

require 'rails_helper'

RSpec.describe YearlyBreakdownBalanceTable, type: :model do
  it { is_expected.to belong_to(:user) }
  it { is_expected.to belong_to(:category) }
  it { is_expected.to belong_to(:breakdown).optional }
end
