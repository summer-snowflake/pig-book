# frozen_string_literal: true

class User < ApplicationRecord
  USER_OPTIONS = %i[daily_option unlimited_option].freeze

  # Include default devise modules. Others available are:
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :confirmable

  include DeviseTokenAuth::Concerns::User

  has_one :admin, dependent: :destroy
  has_one :profile, dependent: :destroy
  has_many :categories, dependent: :destroy
  has_many :breakdowns, dependent: :destroy
  has_many :places, dependent: :destroy
  has_many :tags, dependent: :destroy
  has_many :records, dependent: :destroy
  has_many :tally_events, dependent: :destroy
  has_many :monthly_total_balance_tables, dependent: :destroy
  has_many :monthly_category_balance_tables, dependent: :destroy
  has_many :monthly_breakdown_balance_tables, dependent: :destroy
  has_many :yearly_total_balance_tables, dependent: :destroy
  has_many :yearly_category_balance_tables, dependent: :destroy
  has_many :yearly_breakdown_balance_tables, dependent: :destroy

  # NOTE: 現時点において、管理者以外はオプションの変更を行えない
  validate :unauthorized_options

  def admin?
    !admin.nil?
  end

  def active
    !confirmed_at.nil?
  end

  def dashboard_years
    this_year = Time.zone.today.year
    return [this_year] if monthly_total_balance_tables.blank? || records.blank?

    minimum_year = monthly_total_balance_tables.minimum(:year)
    twenty_years_old = this_year - 30
    year = minimum_year < twenty_years_old ? twenty_years_old : minimum_year
    [*(year..this_year)].reverse
  end

  def tutorial
    @tutorial ||= Tutorial.new(user_id: id)
  end

  def options_list
    return I18n.t('label.nothing') unless options?

    options.select { |option| option[:value] }.pluck(:name).join(', ')
  end

  private

  def options?
    daily_option || unlimited_option
  end

  def options
    USER_OPTIONS.map.with_index do |option, index|
      {
        id: index + 1,
        name: User.human_attribute_name(option),
        column: option,
        value: send(option),
        description: I18n.t("label.options.#{option}")
      }
    end
  end

  def unauthorized_options
    return if admin?

    # NOTE: OFF にしかできない
    errors.add(:daily_option, :is_unauthorized) if daily_option
    errors.add(:unlimited_option, :is_unauthorized) if unlimited_option
  end
end
