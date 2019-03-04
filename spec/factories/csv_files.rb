# frozen_string_literal: true

FactoryBot.define do
  factory :csv_file do
    csv_data { fixture_file_upload('spec/fixtures/upload.csv', 'text/csv') }
    conditions { '2019年 3月 100件まで' }
  end
end
