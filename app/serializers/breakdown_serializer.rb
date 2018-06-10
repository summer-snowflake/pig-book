# frozen_string_literal: true

class BreakdownSerializer < ActiveModel::Serializer
  attributes :id, :name, :category_name

  def category_name
    object.category.name
  end
end
