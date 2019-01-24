# frozen_string_literal: true

require 'rails_helper'

RSpec.describe YearlyCategoryBalanceTable, type: :model do
  describe 'relationship' do
    it { is_expected.to belong_to(:category).optional }
  end
end