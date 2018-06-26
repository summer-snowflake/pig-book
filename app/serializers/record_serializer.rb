# frozen_string_literal: true

class RecordSerializer < ActiveModel::Serializer
  attributes :id, :category_id, :balance_of_payments, :category_name,
             :breakdown_id, :breakdown_name, :place_id, :place_name,
             :published_at, :charge, :human_charge, :memo

  def balance_of_payments
    object.category.balance_of_payments
  end

  def category_name
    object.category.name
  end

  def breakdown_name
    object.breakdown&.name
  end

  def place_name
    object.place&.name
  end

  def human_charge
    object.decorate.human_charge
  end
end
