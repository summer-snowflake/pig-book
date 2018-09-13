# frozen_string_literal: true

require 'rails_helper'

RSpec.describe ImportHistory, type: :model do
  describe 'relationship' do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to belong_to(:record).optional }
  end
end
