# frozen_string_literal: true

class PiggyBank < ApplicationRecord
  include EnumDefinedCurrency

  belongs_to :user
  has_many :piggy_items, dependent: :restrict_with_exception

  TITLE_MAX_LENGTH = 30
  DESCRIPTION_MAX_LENGTH = 255

  validates :title, presence: true, length: { maximum: TITLE_MAX_LENGTH },
                    uniqueness: { scope: :user }
  validates :description, length: { maximum: DESCRIPTION_MAX_LENGTH }
end
