# frozen_string_literal: true

module EnumDefinedCurrency
  extend ActiveSupport::Concern

  included do
    enum currency: { yen: 0, dollar: 1 }
  end
end
