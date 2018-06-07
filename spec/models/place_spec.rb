# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Place, type: :model do
  describe 'relationship' do
    it { is_expected.to belong_to(:user) }
  end

  describe 'validation' do
    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_length_of(:name).is_at_most(30) }
  end
end
