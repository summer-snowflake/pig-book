# frozen_string_literal: true

class YearlyRecord < ApplicationRecord
  include EnumDefinedCurrency

  belongs_to :user, touch: true
end
