# frozen_string_literal: true

class Profile < ApplicationRecord
  belongs_to :user

  enum locale: { ja: 0, en: 1 }
  enum currency: { yen: 0, dollar: 1 }
end
