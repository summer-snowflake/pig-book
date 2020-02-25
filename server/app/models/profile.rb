# frozen_string_literal: true

class Profile < ApplicationRecord
  include EnumDefinedCurrency

  belongs_to :user

  validates :memo, length: { maximum: 1000 }

  enum locale: { ja: 0, en: 1 }
end
