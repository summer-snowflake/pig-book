# frozen_string_literal: true

class TemplateSerializer < ActiveModel::Serializer
  attributes :id, :name, :category_name, :breakdown_id, :breakdown_name,
             :tag_id, :tag_name, :tag_color_code, :charge, :memo

  def category_name
    object.category.name
  end

  def breakdown_name
    object.breakdown&.name
  end

  def tag_name
    object.tag&.name
  end

  def tag_color_code
    object.tag&.color_code
  end
end
