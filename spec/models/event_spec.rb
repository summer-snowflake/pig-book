# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Event, type: :model do
  describe 'relationship' do
    it { is_expected.to belong_to(:user) }
    it do
      is_expected.to belong_to(:operator)
        .with_foreign_key(:created_by).class_name(User)
    end
  end

  describe '#category' do
    it do
      is_expected.to define_enum_for(:category)
        .with_values(%i[tally_monthly])
    end
  end
end
