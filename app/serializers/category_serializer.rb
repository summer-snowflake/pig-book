# frozen_string_literal: true

class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name, :balance_of_payments
end
