# frozen_string_literal: true

class Tutorial
  include ActiveModel::Model

  attr_accessor :user_id, :user

  def initialize(user_id:)
    @user_id = user_id
    @user = User.find(user_id)
  end
end
