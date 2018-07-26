# frozen_string_literal: true

class TemplateSerializer < ActiveModel::Serializer
  attributes :id, :name, :category_name, :breakdown_name, :tag_name,
             :charge, :memo

  def category_name
    object.category.name
  end

  def breakdown_name
    object.breakdown&.name
  end

  def tag_name
    object.tag&.name
  end
end
