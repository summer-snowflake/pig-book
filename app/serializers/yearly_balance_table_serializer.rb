# frozen_string_literal: true

class YearlyBalanceTableSerializer < ActiveModel::Serializer
  attributes :id, :human_charge, :charge
  attribute :category_id, if: -> { category? || breakdown? }
  attribute :category_name, if: -> { category? || breakdown? }
  attribute :breakdown_name, if: -> { breakdown? }

  def human_charge
    object.decorate.human_charge
  end

  def category_name
    object.decorate.category_name
  end

  def breakdown_name
    object.decorate.breakdown_name
  end

  private

  def category?
    object.category_type?
  end

  def breakdown?
    object.breakdown_type?
  end
end
