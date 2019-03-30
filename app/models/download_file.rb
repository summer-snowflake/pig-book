# frozen_string_literal: true

class DownloadFile < ApplicationRecord
  AWS_S3_EXPIRES_IN = 86_400

  belongs_to :user

  scope :active, lambda {
    elapsed_time = Time.zone.now - AWS_S3_EXPIRES_IN.seconds
    where('created_at > ?', elapsed_time)
  }

  def active?
    elapsed_time = Time.zone.now - AWS_S3_EXPIRES_IN.seconds
    created_at > elapsed_time
  end
end
