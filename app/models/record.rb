# frozen_string_literal: true

class Record < ApplicationRecord
  include ValidationErrorMessagesBuilder

  belongs_to :user
end
