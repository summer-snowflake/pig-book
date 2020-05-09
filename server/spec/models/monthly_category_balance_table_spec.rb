# frozen_string_literal: true

require 'rails_helper'

RSpec.describe MonthlyCategoryBalanceTable, type: :model do
  it { is_expected.to belong_to(:user) }
  it do
    is_expected.to belong_to(:category)
      .class_name('Category').with_foreign_key(:parent_id)
  end
end
