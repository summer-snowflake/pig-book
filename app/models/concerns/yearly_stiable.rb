# frozen_string_literal: true

module YearlyStiable
  extend ActiveSupport::Concern

  ALL_TYPE_NUMBER = 1
  CATEGORY_TYPE_NUMBER = 2
  BREAKDOWN_TYPE_NUMBER = 3

  module ClassMethods
    def find_sti_class(type_name)
      case type_name
      when ALL_TYPE_NUMBER then YearlyAllBalanceTable
      when CATEGORY_TYPE_NUMBER then YearlyCategoryBalanceTable
      when BREAKDOWN_TYPE_NUMBER then YearlyBreakdownBalanceTable
      else self
      end
    end

    def sti_name
      case to_s
      when 'YearlyAllBalanceTable' then ALL_TYPE_NUMBER
      when 'YearlyCategoryBalanceTable' then CATEGORY_TYPE_NUMBER
      when 'YearlyBreakdownBalanceTable' then BREAKDOWN_TYPE_NUMBER
      else 0
      end
    end
  end

  def all_type?
    type == ALL_TYPE_NUMBER
  end

  def category_type?
    type == CATEGORY_TYPE_NUMBER
  end
end
