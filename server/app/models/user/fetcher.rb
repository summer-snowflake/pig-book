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
    page = params[:page] ? params[:page].to_i : 1
    users = User.all
    @max_page = (users.count / PER_PAGE.to_f).ceil
    @users = users.includes(:admin)
                  .offset(PER_PAGE * (page - 1))
                  .limit(PER_PAGE)
                  .order(created_at: :desc)
  end
end
