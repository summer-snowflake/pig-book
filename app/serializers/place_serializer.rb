# frozen_string_literal: true

class PlaceSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :categories, serializer: CategorySerializer
end
