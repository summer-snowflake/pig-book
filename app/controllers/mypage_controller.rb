# frozen_string_literal: true

class MypageController < ApplicationController
  before_action :authenticate_user!
  before_action :set_last_request_at, :set_authentication_token, only: %i[show]
  before_action :set_download_files, only: %i[show]

  DOWNLOAD_FILES_COUNT = 5

  def show
    fetcher = Record::Fetcher.new(user: current_user)
    fetcher.find_all_by(order: :created_at, limit: 5)
    auth_params = {
      user_token: @access_token,
      last_request_at: @last_request_at
    }
    @memo_params = auth_params.merge(memo: current_user.profile.memo)
    @records_params = auth_params.merge(records: fetcher.records)
    @download_files_params = auth_params.merge(download_files: @download_files)
  end

  private

  def set_download_files
    @download_files = current_user.download_files.limit(DOWNLOAD_FILES_COUNT)
  end
end
