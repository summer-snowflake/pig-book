# frozen_string_literal: true

class Profile < ApplicationRecord
  include EnumDefinedCurrency

  belongs_to :user

  validates :memo, length: { maximum: 250 }

  enum locale: { ja: 0, en: 1 }
end
