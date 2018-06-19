# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Profile, type: :model do
  describe 'relationship' do
    it { is_expected.to belong_to(:user) }
  end

  describe '#locale' do
    it { is_expected.to define_enum_for(:locale).with_values(%i[ja en]) }
  end
end
