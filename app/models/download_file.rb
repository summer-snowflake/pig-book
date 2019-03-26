# frozen_string_literal: true

class DownloadFile < ApplicationRecord
  belongs_to :user

  scope :active, lambda {
    elapsed_time = Time.zone.now - Record::Fetcher::AWS_S3_EXPIRES_IN.seconds
    where('created_at > ?', elapsed_time)
  }

  def active?
    elapsed_time = Time.zone.now - Record::Fetcher::AWS_S3_EXPIRES_IN.seconds
    created_at > elapsed_time
  end
end
