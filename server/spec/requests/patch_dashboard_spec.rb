# frozen_string_literal: true

require 'rails_helper'

describe 'PATCH /api/records/:id' do
  let!(:user) { create(:user) }
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

  context 'when NOT logged in.' do
    it 'returns status code 401 and json errors data.' do
      patch "/api/dashboards/#{year}"

      expect(response.status).to eq 401
      json = {
        errors: ['アカウント登録もしくはログインしてください。']
      }.to_json
      expect(response.body).to be_json_eql(json)
    end
  end

  context 'when logged in.' do
    context 'params are valid' do
      it 'returns status code 200 and json record data.' do
        patch "/api/dashboards/#{year}",
              headers: login_headers_with_login(user)

        expect(response.status).to eq 200
      end
    end
  end
end
