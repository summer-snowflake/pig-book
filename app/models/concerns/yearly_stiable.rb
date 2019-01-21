# frozen_string_literal: true

module YearlyStiable
  extend ActiveSupport::Concern

  module ClassMethods
    def find_sti_class(type_name)
      case type_name
      when 1 then YearlyAllBalanceTable
      when 2 then YearlyCategoryBalanceTable
      else self
      end
    end

    def sti_name
      case to_s
      when 'YearlyAllBalanceTable' then 1
      when 'YearlyCategoryBalanceTable' then 2
      else 0
      end
    end
  end
end
