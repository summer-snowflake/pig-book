# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Breakdown, type: :model do
  describe 'relationship' do
    it { is_expected.to belong_to(:category) }
  end
end
