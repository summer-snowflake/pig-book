# frozen_string_literal: true

class ImportHistory < ApplicationRecord
  include ValidationErrorMessagesBuilder
  DISPLAY_LIMIT_COUNT = 100

  belongs_to :user
  belongs_to :record, optional: true

  scope :unregistered, -> { where(record_id: nil) }
  scope :registered, -> { where.not(record_id: nil) }
end
