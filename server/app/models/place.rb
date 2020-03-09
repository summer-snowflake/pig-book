# frozen_string_literal: true

class Place < ApplicationRecord
  belongs_to :user

  validates :name, presence: true, length: { maximum: 30 },
                   uniqueness: { scope: :user }
end
