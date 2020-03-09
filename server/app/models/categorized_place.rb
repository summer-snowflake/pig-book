# frozen_string_literal: true

class CategorizedPlace < ApplicationRecord
  belongs_to :category
  belongs_to :place

  validates :category_id, uniqueness: { scope: :place }
end
