# frozen_string_literal: true

class TaggedRecord < ApplicationRecord
  belongs_to :record
  belongs_to :tag
end
