# frozen_string_literal: true

class ImportHistorySerializer < ActiveModel::Serializer
  attributes :id, :row, :messages, :status_name,
             :category_name, :category_required,
             :breakdown_name, :breakdown_required,
             :place_name, :place_required,
             :tags_name, :tags_required, :record_id

  def category_required
    object.category_required?
  end

  def breakdown_required
    object.breakdown_required?
  end

  def place_required
    object.place_required?
  end

  def tags_required
    object.tags_required?
  end

  def messages
    object.assign_builder
    object.messages
  end

  def tags_name
    object.tags.join(',')
  end
end
