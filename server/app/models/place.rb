# frozen_string_literal: true

class Place < ApplicationRecord
  MAX_NUMBER = 20

  belongs_to :user, touch: true
  counter_culture :user
  has_many :categorized_places, dependent: :destroy
  has_many :categories, through: :categorized_places
  has_many :records, dependent: :restrict_with_exception

  validates :name, presence: true, length: { maximum: 30 },
                   uniqueness: { scope: :user }
  validate :should_have_limited_count

  private

  def should_have_limited_count
    return unless user
    return if user.unlimited_option
    return if user.places.count < MAX_NUMBER

    errors.add(:base, :is_limited)
  end
end
