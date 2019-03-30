# frozen_string_literal: true

FactoryBot.define do
  factory :download_file do
    user
    filename { Time.zone.now.strftime('%Y%m%d%H%M%S') }
    path { 'download_file_path' }
  end
end
