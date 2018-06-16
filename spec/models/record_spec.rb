# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Record, type: :model do
  describe 'relationship' do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to belong_to(:category) }
    it { is_expected.to belong_to(:breakdown) }
    it { is_expected.to belong_to(:place) }
  end
end
