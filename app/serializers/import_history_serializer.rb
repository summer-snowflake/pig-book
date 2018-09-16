# frozen_string_literal: true

class ImportHistorySerializer < ActiveModel::Serializer
  attributes :id, :row, :messages, :status_name,
             :category_name, :category_required

  def category_required
    object.category_required?
  end
end
