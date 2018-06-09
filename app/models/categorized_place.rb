# frozen_string_literal: true

class CategorizedPlace < ApplicationRecord
  include ValidationErrorMessagesBuilder

  belongs_to :category
  belongs_to :place
end
