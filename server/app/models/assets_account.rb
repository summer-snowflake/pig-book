# frozen_string_literal: true

class AssetsAccount < ApplicationRecord
  belongs_to :user, touch: true

  validates :name, presence: true, length: { maximum: 30 },
                   uniqueness: { scope: :user }
end
