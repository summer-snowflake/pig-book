# frozen_string_literal: true

class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :confirmable, :lockable, :timeoutable, :omniauthable

  has_many :categories, dependent: :destroy
  has_many :places, dependent: :destroy
  has_one :admin, dependent: :destroy

  def admin?
    !admin.nil?
  end
end
