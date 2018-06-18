# frozen_string_literal: true

class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :confirmable, :lockable, :timeoutable, :omniauthable

  has_many :categories, dependent: :destroy
  has_many :places, dependent: :destroy
  has_many :breakdowns, through: :categories
  has_many :tags, dependent: :destroy
  has_many :records, dependent: :destroy
  has_one :admin, dependent: :destroy
  has_one :profile, dependent: :destroy

  validates :authentication_token, uniqueness: true, allow_nil: true

  def admin?
    !admin.nil?
  end

  def ensure_authentication_token
    authentication_token || generate_authentication_token
  end

  private

  def generate_authentication_token
    token = SecureRandom.urlsafe_base64(24)
    update!(authentication_token: token)
  rescue StandardError
    generate_authentication_token
  end
end
