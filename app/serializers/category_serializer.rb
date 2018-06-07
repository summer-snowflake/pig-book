# frozen_string_literal: true

class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name, :human_balance_of_payments,
             :success_or_danger_style_class

  def human_balance_of_payments
    object.decorate.human_balance_of_payments
  end

  def success_or_danger_style_class
    object.decorate.success_or_danger_style_class
  end
end
