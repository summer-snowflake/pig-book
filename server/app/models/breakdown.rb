# frozen_string_literal: true

class Breakdown < ApplicationRecord
  belongs_to :user
  belongs_to :category
  has_many :records, dependent: :restrict_with_exception

  validates :name, presence: true, length: { maximum: 30 },
                   uniqueness: { scope: %i[user category] }
end
