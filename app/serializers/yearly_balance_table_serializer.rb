# frozen_string_literal: true

class YearlyBalanceTableSerializer < ActiveModel::Serializer
  attributes :id, :human_charge, :charge
  attribute :category_name, if: -> { category? }

  def human_charge
    object.decorate.human_charge
  end

  def category_name
    object.decorate.category_name
  end

  private

  def category?
    object.category.present?
  end
end
