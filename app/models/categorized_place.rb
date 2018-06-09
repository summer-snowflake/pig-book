# frozen_string_literal: true

class CategorizedPlace < ApplicationRecord
  include ValidationErrorMessagesBuilder

  belongs_to :category
  belongs_to :place

  validates :category_id, uniqueness: { scope: :place_id }
end
