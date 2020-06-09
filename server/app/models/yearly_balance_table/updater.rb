# frozen_string_literal: true

class YearlyBalanceTable::Updater
  include ActiveModel::Model

  attr_reader :user

  validates :year, numericality: { only_integer: true, greater_than: 0 }

  def initialize(user:)
    @user = user
  end

  def update(year:)
    update_yearly(year)
  end

  private

  def update_yearly(year)
    update_total_yearly(year)
    destroy_category_yearly(year)
    update_category_yearly(year)
    destroy_breakdown_yearly(year)
    update_breakdown_yearly(year)
  end

  def update_total_yearly(year)
    yearly =
      user.yearly_total_balance_tables
          .find_or_initialize_by(year: year, currency: user.profile.currency)
    yearly.update!(sum_total_params(year))
  end

  def destroy_category_yearly(year)
    category_ids =
      user.yearly_category_balance_tables.where(year: year).pluck(:category_id) -
      user.monthly_category_balance_tables.where(year: year).pluck(:category_id)
    return if category_ids.blank?

    unnecessary_records = user.yearly_category_balance_tables
                              .where(year: year, category_id: category_ids)
    unnecessary_records.delete_all
  end

  def update_category_yearly(year)
    user.monthly_category_balance_tables
        .group_by(&:category_id).each do |category_id, records|
      category_yearly = user.yearly_category_balance_tables
                            .find_or_initialize_by(
                              year: year,
                              currency: user.profile.currency,
                              category_id: category_id
                            )
      category_yearly.update!(sum_category_params(records, category_id))
    end
  end

  def sum_total_params(year)
    monthly = user.monthly_total_balance_tables
                  .where(year: year, currency: user.profile.currency)
    sum_params(monthly)
  end

  def sum_category_params(records, category_id)
    category = user.categories.find(category_id)
    sum_params(records).merge(label: category.name)
  end

  def sum_params(records)
    {
      income: records.inject(0) { |sum, m| sum + m.income },
      expenditure: records.inject(0) { |sum, m| sum + m.expenditure },
      cashless_charge: records.inject(0) { |sum, m| sum + m.cashless_charge },
      point: records.inject(0) { |sum, m| sum + m.point }
    }
  end

  def destroy_breakdown_yearly(year)
    breakdown_ids =
      user.yearly_breakdown_balance_tables.where(year: year).pluck(:breakdown_id) -
      breakdown_monthly.where(year: year).pluck(:breakdown_id)
    return if breakdown_ids.blank?

    unnecessary_records = user.yearly_breakdown_balance_tables
                              .where(year: year, breakdown_id: breakdown_ids)
    unnecessary_records.delete_all
  end

  def update_breakdown_yearly(year)
    breakdown_monthly.group_by(&:category_id).each do |category_id, c_records|
      c_records.group_by(&:breakdown_id).each do |breakdown_id, records|
        breakdown_yearly =
          user.yearly_breakdown_balance_tables.find_or_initialize_by(
            year: year, currency: user.profile.currency,
            category_id: category_id, breakdown_id: breakdown_id
          )
        breakdown_yearly.update!(sum_breakdown_params(breakdown_id, records))
      end
    end
  end

  def breakdown_monthly
    user.monthly_breakdown_balance_tables
  end

  def sum_breakdown_params(breakdown_id, records)
    breakdown = user.breakdowns.find_by(id: breakdown_id)
    label = breakdown ? breakdown.name : I18n.t('label.nothing')
    sum_params(records).merge(label: label)
  end
end
