# frozen_string_literal: true

class BreakdownSerializer < ActiveModel::Serializer
  attributes :id, :name, :category_name

  attribute :category_human_balance_of_payments, if: -> { breakdowns_list? }
  attribute :category_success_or_danger_style_class, if: -> { breakdowns_list? }

  def category_name
    object.category.name
  end

  def category_human_balance_of_payments
    object.category.decorate.human_balance_of_payments
  end

  def category_success_or_danger_style_class
    object.category.decorate.success_or_danger_style_class
  end

  private

  def breakdowns_list?
    instance_options[:prefixes][0] == 'api/breakdowns'
  end
end
