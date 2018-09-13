# frozen_string_literal: true

class ImportHistorySerializer < ActiveModel::Serializer
  attributes :id, :row, :messages, :status_name
end
