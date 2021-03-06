# frozen_string_literal: true

class Tag < ApplicationRecord
  MAX_NUMBER = 20

  belongs_to :user, touch: true
  counter_culture :user

  # has_many dependent よりも先にチェック
  before_destroy :check_usage

  has_many :tagged_records, dependent: :destroy
  has_many :records, through: :tagged_records

  validates :name, presence: true, length: { maximum: 30 },
                   uniqueness: { scope: :user }
  validates :color_code, presence: true, length: { maximum: 7 },
                         uniqueness: { scope: :user }
  validate :should_have_limited_count

  private

  def check_usage
    return true if records.count.zero?

    throw :abort
  end

  def should_have_limited_count
    return unless user
    return if user.unlimited_option
    return if user.tags.count < MAX_NUMBER

    errors.add(:base, :is_limited)
  end
end
