# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Category, type: :model do
  it { is_expected.to belong_to(:user) }
  it do
    is_expected.to have_many(:breakdowns).dependent(:restrict_with_exception)
  end
  it { is_expected.to have_many(:categorized_places).dependent(:destroy) }
  it { is_expected.to have_many(:records) }

  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.to validate_length_of(:name).is_at_most(30) }
end
