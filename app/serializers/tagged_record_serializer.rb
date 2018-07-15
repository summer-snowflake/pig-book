# frozen_string_literal: true

class TaggedRecordSerializer < ActiveModel::Serializer
  attributes :id, :tag_id, :tag_name, :tag_color_code

  def tag_id
    object.tag.id
  end

  def tag_name
    object.tag.name
  end

  def tag_color_code
    object.tag.color_code
  end
end
