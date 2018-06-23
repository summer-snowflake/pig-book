# frozen_string_literal: true

class ProfileSerializer < ActiveModel::Serializer
  attributes :id, :currency, :human_currency

  def human_currency
    I18n.t("helpers.label.profile.currency.#{object.currency}")
  end
end
