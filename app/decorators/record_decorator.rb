# frozen_string_literal: true

class RecordDecorator < ApplicationDecorator
  delegate_all
  include ActionView::Helpers::NumberHelper

  def human_charge
    precision = yen? ? 0 : 2
    number_to_currency(charge, unit: human_currency,
                               format: '%u%n', precision: precision)
  end

  private

  def human_currency
    I18n.t("helpers.label.profile.currency.#{currency}")
  end
end
