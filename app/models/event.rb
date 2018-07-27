# frozen_string_literal: true

class Event < ApplicationRecord
  belongs_to :user

  enum category: { monthly_calculator: 0 }
end
