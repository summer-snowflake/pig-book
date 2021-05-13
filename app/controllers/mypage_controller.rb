# frozen_string_literal: true

class MypageController < ApplicationController
  def show
    @size = current_user.assets_accounts.size
  end
end
