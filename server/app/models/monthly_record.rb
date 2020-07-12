# frozen_string_literal: true

class MonthlyRecord < ApplicationRecord
  include EnumDefinedCurrency

  belongs_to :user, touch: true
end
