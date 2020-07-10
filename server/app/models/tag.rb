# frozen_string_literal: true

class Tag < ApplicationRecord
  belongs_to :user
  counter_culture :user

  # has_many dependent よりも先にチェック
  before_destroy :check_usage

  has_many :tagged_records, dependent: :destroy
  has_many :records, through: :tagged_records

  validates :name, presence: true, length: { maximum: 30 },
                   uniqueness: { scope: :user }
  validates :color_code, presence: true, length: { maximum: 7 },
                         uniqueness: { scope: :user }

  private

  def check_usage
    return true if records.count.zero?

    throw :abort
  end
end
