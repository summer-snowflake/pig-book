# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Tag, type: :model do
  it { is_expected.to belong_to(:user) }
  it { is_expected.to have_many(:tagged_records).dependent(:destroy) }

  it { is_expected.to validate_presence_of(:color_code) }
  it { is_expected.to validate_length_of(:color_code).is_at_most(7) }
end
