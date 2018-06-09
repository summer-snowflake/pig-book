# frozen_string_literal: true

class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name, :human_balance_of_payments,
             :success_or_danger_style_class

  has_many :places, serializer: PlaceSerializer,
                    if: -> { categories_list? }
  has_many :breakdowns, serializer: BreakdownSerializer,
                        if: -> { categories_list? }

  def categories_list?
    instance_options[:prefixes][0] == 'api/categories'
  end

  def human_balance_of_payments
    object.decorate.human_balance_of_payments
  end

  def success_or_danger_style_class
    object.decorate.success_or_danger_style_class
  end
end
