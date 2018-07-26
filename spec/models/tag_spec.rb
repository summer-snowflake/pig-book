# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Tag, type: :model do
  describe 'relationship' do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to have_many(:tagged_records) }
    it { is_expected.to have_many(:templates) }
  end

  describe 'validation' do
    it { is_expected.to validate_presence_of(:color_code) }
    it { is_expected.to allow_value('#ffffff').for(:color_code) }
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_length_of(:name).is_at_most(30) }
  end
end
