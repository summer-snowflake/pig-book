# frozen_string_literal: true

class Breakdown < ApplicationRecord
  belongs_to :user
  belongs_to :category

  validates :name, presence: true, length: { maximum: 30 }
end
