# frozen_string_literal: true

require 'rails_helper'

RSpec.describe CategorizedPlace, type: :model do
  describe 'relationship' do
    it { is_expected.to belong_to(:category) }
    it { is_expected.to belong_to(:place) }
  end
end
