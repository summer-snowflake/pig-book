# frozen_string_literal: true

class YearlyAllBalanceTable::Fetcher
  def initialize(user:)
    @user = user
  end

  def self.all(user:)
    new(user: user).all
  end

  def all
    @user.yearly_all_balance_tables
         .where(currency: @user.base_setting.currency)
         .order(:year)
  end
end
