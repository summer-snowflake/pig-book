# frozen_string_literal: true

class PiggyBank < ApplicationRecord
  belongs_to :user

  TITLE_MAX_LENGTH = 30
  DESCRIPTION_MAX_LENGTH = 255

  validates :title, presence: true, length: { maximum: TITLE_MAX_LENGTH },
                    uniqueness: { scope: :user }
  validates :description, presence: true, length: { maximum: DESCRIPTION_MAX_LENGTH }
end
