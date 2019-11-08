# frozen_string_literal: true

class BreakdownSerializer < ActiveModel::Serializer
  attributes :id, :name, :category_name

  attribute :category_balance_of_payments, if: -> { breakdowns_list? }

  def category_name
    object.category.name
  end

  def category_balance_of_payments
    object.category.decorate.balance_of_payments
  end

  private

  def breakdowns_list?
    instance_options[:prefixes][0] == 'api/breakdowns'
  end
end
