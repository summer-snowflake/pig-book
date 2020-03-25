# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  it { is_expected.to have_one(:admin).dependent(:destroy) }
  it { is_expected.to have_one(:profile).dependent(:destroy) }
  it { is_expected.to have_many(:categories).dependent(:destroy) }
  it { is_expected.to have_many(:breakdowns).dependent(:destroy) }
  it { is_expected.to have_many(:places).dependent(:destroy) }
  it { is_expected.to have_many(:records).dependent(:destroy) }
  it { is_expected.to have_many(:events).dependent(:destroy) }
end
