# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Category, type: :model do
  it { is_expected.to belong_to(:user) }
  it do
    is_expected.to have_many(:breakdowns).dependent(:restrict_with_exception)
  end
  it { is_expected.to have_many(:categorized_places).dependent(:destroy) }
  it { is_expected.to have_many(:places).through(:categorized_places) }
  it { is_expected.to have_many(:records) }
  it do
    is_expected.to have_many(:monthly_category_balance_tables)
      .dependent(:destroy)
  end
  it do
    is_expected.to have_many(:monthly_breakdown_balance_tables)
      .dependent(:destroy)
  end
  it do
    is_expected.to have_many(:yearly_category_balance_tables)
      .dependent(:destroy)
  end
  it do
    is_expected.to have_many(:yearly_breakdown_balance_tables)
      .dependent(:destroy)
  end

  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.to validate_length_of(:name).is_at_most(30) }
end
