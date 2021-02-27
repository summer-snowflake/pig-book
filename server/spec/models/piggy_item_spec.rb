# frozen_string_literal: true

require 'rails_helper'

RSpec.describe PiggyItem, type: :model do
  it { is_expected.to belong_to(:piggy_bank) }

  it { is_expected.to validate_presence_of(:charge) }
  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.to validate_length_of(:name).is_at_most(255) }
end
