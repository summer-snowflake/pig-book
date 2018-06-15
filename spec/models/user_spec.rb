# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'relationship' do
    it { is_expected.to have_many(:categories).dependent(:destroy) }
    it { is_expected.to have_many(:places).dependent(:destroy) }
    it { is_expected.to have_many(:breakdowns).through(:categories) }
    it { is_expected.to have_many(:tags).dependent(:destroy) }
    it { is_expected.to have_one(:admin).dependent(:destroy) }
  end

  describe 'validation' do
    it do
      is_expected.to validate_uniqueness_of(:authentication_token).allow_nil
    end
  end
end
