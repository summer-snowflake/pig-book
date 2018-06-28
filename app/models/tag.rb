# frozen_string_literal: true

class Tag < ApplicationRecord
  include ValidationErrorMessagesBuilder

  belongs_to :user

  validates :color_code, presence: true,
                         format: { with: /#\w+/, allow_blank: true },
                         uniqueness: { scope: :user }
  validates :name, presence: true, length: { maximum: 30 }
end
