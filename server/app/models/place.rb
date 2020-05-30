# frozen_string_literal: true

class Place < ApplicationRecord
  belongs_to :user
  counter_culture :user
  has_many :categorized_places, dependent: :destroy
  has_many :categories, through: :categorized_places
  has_many :records, dependent: :restrict_with_exception

  validates :name, presence: true, length: { maximum: 30 },
                   uniqueness: { scope: :user }
end
