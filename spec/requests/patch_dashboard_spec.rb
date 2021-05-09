# frozen_string_literal: true

require 'rails_helper'

describe 'PATCH /api/records/:id', autodoc: true do
  let!(:user) { create(:user, :active, :with_profile) }
  let!(:category1) { create(:category, user: user) }
  let!(:category2) { create(:category, user: user) }
  let!(:breakdown1) { create(:breakdown, user: user, category: category1) }
  let!(:breakdown2) { create(:breakdown, user: user, category: category2) }
  let!(:place) { create(:place, user: user) }
  let!(:record) do
    create(:record, user: user, category: category1, breakdown: breakdown1)
  end
  let!(:record2) do
    create(:record, user: user, category: category1, breakdown: breakdown1)
  end
  let!(:record3) do
    create(:record, user: user, category: category2, breakdown: breakdown2)
  end
  let!(:record4) do
    create(:record, user: user, category: category2, breakdown: breakdown2)
  end
  let!(:record5) do
    create(:record, user: user, category: category2, place: place)
  end
  let(:year) { Time.zone.today.year }
  let(:path) { "/api/dashboards/#{year}" }

  context 'when NOT logged in.' do
    before do
      patch path
    end

    it_behaves_like 'set alert message of the authentication'
  end

  context 'when logged in.' do
    before do
      sign_in user
    end

    it 'returns status code 200 and json dashboard data' do
      patch path
      expect(response.status).to eq 200

      json = {
        event: {
          user_id: user.id,
          year: year
        }
      }.to_json
      expect(response.body).to be_json_eql(json)
      expect(user.monthly_total_balance_tables.count).to eq 12
    end
  end
end
