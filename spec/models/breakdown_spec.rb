# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Breakdown, type: :model do
  it { is_expected.to belong_to(:user) }
  it { is_expected.to belong_to(:category) }
  it { is_expected.to have_many(:records) }
  it do
    is_expected.to have_many(:monthly_breakdown_balance_tables)
      .dependent(:destroy)
  end
  it do
    is_expected.to have_many(:yearly_breakdown_balance_tables)
      .dependent(:destroy)
  end

  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.to validate_length_of(:name).is_at_most(30) }
end
