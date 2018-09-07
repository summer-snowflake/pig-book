# frozen_string_literal: true

class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name, :balance_of_payments, :human_balance_of_payments,
             :success_or_danger_style_class

  has_many :places, serializer: PlaceSerializer,
                    if: -> { categories_list? }
  has_many :breakdowns, serializer: BreakdownSerializer,
                        if: -> { categories_list? }
  has_many :templates, serializer: TemplateSerializer,
                       if: -> { categories_list? }

  def human_balance_of_payments
    object.decorate.human_balance_of_payments
  end

  def success_or_danger_style_class
    object.decorate.success_or_danger_style_class
  end

  private

  def categories_list?
    instance_options[:prefixes][0] == 'api/categories' ||
      instance_options[:prefixes][0] == 'api/recently_used_categories'
  end
end
