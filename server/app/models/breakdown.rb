# frozen_string_literal: true

class Breakdown < ApplicationRecord
  belongs_to :user
  belongs_to :category
  has_many :records

  validates :name, presence: true, length: { maximum: 30 },
                   uniqueness: { scope: %i[user category] }
end
