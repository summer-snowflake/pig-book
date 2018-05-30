# frozen_string_literal: true

json.categories do
  json.partial! partial: 'categories/category',
                collection: @categories, as: :category
end
