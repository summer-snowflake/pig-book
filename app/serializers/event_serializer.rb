# frozen_string_literal: true

class EventSerializer < ActiveModel::Serializer
  attributes :id, :last_tally_at

  def last_tally_at
    object.created_at
  end
end
