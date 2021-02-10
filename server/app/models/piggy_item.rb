# frozen_string_literal: true

class PiggyItem < ApplicationRecord
  belongs_to :user
  belongs_to :piggy_bank

  NAME_MAX_LENGTH = 255

  validates :charge, presence: true
  validates :name, presence: true, length: { maximum: NAME_MAX_LENGTH }
end
