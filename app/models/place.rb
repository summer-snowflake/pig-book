# frozen_string_literal: true

class Place < ApplicationRecord
  include ValidationErrorMessagesBuilder

  belongs_to :user
  has_many :categorized_places, dependent: :destroy

  validates :name, presence: true, length: { maximum: 30 }
end
