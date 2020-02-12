# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TallyEvent, type: :model do
  describe 'relationship' do
    it { is_expected.to belong_to(:user) }
  end
end