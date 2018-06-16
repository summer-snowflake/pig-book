# frozen_string_literal: true

class Place < ApplicationRecord
  include ValidationErrorMessagesBuilder

  belongs_to :user
  has_many :categorized_places, dependent: :destroy
  has_many :categories, through: :categorized_places
  has_many :records, dependent: :restrict_with_error

  validates :name, presence: true, length: { maximum: 30 }
end
