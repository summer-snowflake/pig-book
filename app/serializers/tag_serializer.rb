# frozen_string_literal: true

class TagSerializer < ActiveModel::Serializer
  attributes :id, :name, :color_code
end
