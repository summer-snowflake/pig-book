# frozen_string_literal: true

class Event < ApplicationRecord
  belongs_to :user
  belongs_to :operator, class_name: 'User', foreign_key: :created_by

  enum category: { tally_monthly: 0 }
end
