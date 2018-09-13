# frozen_string_literal: true

class ImportHistory < ApplicationRecord
  include ValidationErrorMessagesBuilder
  DISPLAY_LIMIT_COUNT = 100

  belongs_to :user
  belongs_to :record, optional: true
end
