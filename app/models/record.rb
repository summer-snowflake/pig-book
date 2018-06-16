# frozen_string_literal: true

class Record < ApplicationRecord
  include ValidationErrorMessagesBuilder

  belongs_to :user
  belongs_to :category
  belongs_to :breakdown
  belongs_to :place
end
