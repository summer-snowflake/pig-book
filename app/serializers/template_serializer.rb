# frozen_string_literal: true

class TemplateSerializer < ActiveModel::Serializer
  attributes :id, :name,
             :category_id, :category_balance_of_payments, :category_name,
             :breakdown_id, :breakdown_name, :tag_id, :charge, :memo

  has_one :tag, serializer: TagSerializer

  def category_balance_of_payments
    object.category.balance_of_payments
  end

  def category_name
    object.category.name
  end

  def breakdown_name
    object.breakdown&.name
  end
end
