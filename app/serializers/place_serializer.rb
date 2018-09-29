# frozen_string_literal: true

class PlaceSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :categories, serializer: CategorySerializer,
                        if: -> { places_list? }

  def places_list?
    instance_options[:prefixes][0] == 'api/places'
  end
end
