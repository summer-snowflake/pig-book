# frozen_string_literal: true

class MonthlyBalanceTable::Updater
  include ActiveModel::Model

  attr_reader :user, :year

  validates :year, numericality: { only_integer: true, greater_than: 0 }

  def initialize(user:)
    @user = user
  end

  def update(year:)
    @year = year

    [*1..12].each do |month|
      monthly = monthly_records(month)

      update_monthly(month)
      update_category_monthly(month)
      destroy_category_monthly(month, monthly) unless monthly.blank?
      destroy_breakdown_monthly(month)
      update_breakdown_monthly(month)
    end
  end

  private

  def monthly_range(month)
    first_date = Date.new(year.to_i, month.to_i, 1).to_s
    beginning = Time.zone.parse(first_date).beginning_of_day
    Range.new(beginning, beginning.end_of_month.end_of_day)
  end

  def sum_charge(records)
    records.inject(0) { |sum, record| sum + record.charge }
  end

  def sum_data(month)
    records = user.records.where(published_at: monthly_range(month))
    [sum_charge(records.income),
     sum_charge(records.expenditure),
     records.inject(0) { |sum, record| sum + record.cashless_charge },
     records.inject(0) { |sum, record| sum + record.point }]
  end

  def update_monthly(month)
    income_charge, expenditure_charge, cashless, point = sum_data(month)

    monthly = user.monthly_total_balance_tables.find_or_initialize_by(
      year: year, month: month, currency: user.profile.currency
    )
    monthly.update!(income: income_charge, expenditure: expenditure_charge,
                    cashless_charge: cashless, point: point)
  end

  def sum_category_data(category_id, records)
    category = user.categories.find(category_id)
    { label: category.name }.merge(sum_hash_data(category, records))
  end

  def sum_breakdown_data(category_id, breakdown_id, records)
    category = user.categories.find(category_id)
    breakdown = user.breakdowns.find_by(id: breakdown_id)
    { label: breakdown.nil? ? I18n.t('label.nothing') : breakdown.name }
      .merge(sum_hash_data(category, records))
  end

  def sum_hash_data(category, records)
    balance_of_payments = category.balance_of_payments

    {
      income: balance_of_payments ? sum_charge(records) : 0,
      expenditure: balance_of_payments ? 0 : sum_charge(records),
      cashless_charge: records.inject(0) { |sum, r| sum + r.cashless_charge },
      point: records.inject(0) { |sum, r| sum + r.point }
    }
  end

  def update_category_monthly(month)
    monthly_records(month).group_by(&:category_id)
                          .each do |category_id, records|
      monthly = user.monthly_category_balance_tables.find_or_initialize_by(
        year: year, month: month,
        currency: user.profile.currency, category_id: category_id
      )
      monthly.update(sum_category_data(category_id, records))
    end
  end

  def destroy_category_monthly(month, monthly)
    category_ids = monthly.pluck(:category_id)
    category = user.categories.find(category_ids.last)
    balance = category.balance_of_payments ? { income: 0 } : { expenditure: 0 }

    unnecessary_records =
      user.monthly_category_balance_tables
          .where(month: month, year: year, currency: user.profile.currency)
          .where.not(category_id: category_ids)
          .where.not(balance)
    unnecessary_records.delete_all
  end

  def update_breakdown_monthly(month)
    monthly_records(month).group_by(&:category_id)
                          .each do |category_id, category_records|
      category_records.group_by(&:breakdown_id).each do |breakdown_id, records|
        monthly = user.monthly_breakdown_balance_tables.find_or_initialize_by(
          year: year, month: month, currency: user.profile.currency,
          category_id: category_id, breakdown_id: breakdown_id
        )
        monthly.update(sum_breakdown_data(category_id, breakdown_id, records))
      end
    end
  end

  def destroy_breakdown_monthly(month)
    user.monthly_breakdown_balance_tables
        .where(year: year, month: month).delete_all
  end

  # TODO: Make Model per Month
  def monthly_records(month)
    user.records.where(published_at: monthly_range(month))
  end
end
