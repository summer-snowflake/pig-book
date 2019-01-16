# frozen_string_literal: true

class YearlyBalanceTableSerializer < ActiveModel::Serializer
  attributes :id, :human_charge

  def human_charge
    object.decorate.human_charge
  end
end
