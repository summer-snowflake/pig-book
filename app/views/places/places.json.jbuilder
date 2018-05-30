# frozen_string_literal: true

json.places do
  json.partial! partial: 'places/place', collection: @places, as: :place
end
