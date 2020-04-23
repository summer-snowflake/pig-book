# frozen_string_literal: true

class User::Fetcher
  include ActiveModel::Model

  attr_reader :users, :max_page

  PER_PAGE = 20

  def initialize
    @users = User.none
    @max_page = 1
  end

  def find_all_by(params)
    page = params[:page] || 1
    @users =
      User.all
          .offset(PER_PAGE * (page - 1))
          .limit(PER_PAGE)
          .order(created_at: :desc)
    @max_page = (users.count / PER_PAGE.to_f).ceil
  end
end
