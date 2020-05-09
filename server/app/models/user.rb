# frozen_string_literal: true

class User < ApplicationRecord
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
  has_many :records, dependent: :destroy
  has_many :tally_events, dependent: :destroy
  has_many :monthly_balance_tables, dependent: :destroy
  has_many :yearly_total_balance_tables, dependent: :destroy

  def admin?
    !admin.nil?
  end

  def active
    !confirmed_at.nil?
  end

  def dashboard_years
    this_year = Time.zone.today.year
    if monthly_balance_tables.blank? || records.minimum(:published_at).nil?
      return [this_year]
    end

    minimum_year = monthly_balance_tables.minimum(:year)
    twenty_years_old = this_year - 30
    year = minimum_year < twenty_years_old ? twenty_years_old : minimum_year
    [*(year..this_year)].reverse
  end

  def tutorial
    @tutorial ||= Tutorial.new(user_id: id)
  end
end
