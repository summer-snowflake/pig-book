# frozen_string_literal: true

class Tag < ApplicationRecord
  belongs_to :user
  has_many :tagged_records, dependent: :destroy
end
