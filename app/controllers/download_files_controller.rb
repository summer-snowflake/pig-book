# frozen_string_literal: true

class DownloadFilesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_last_request_at, :set_authentication_token, only: %i[show]
  before_action :set_download_file, only: %i[show]

  def show
    data = URI.open(@download_file.path)
    send_data(
      data.read,
      filename: @download_file.filename,
      disposition: 'attachment',
      stream: 'true',
      buffer_size: '4096'
    )
  end

  private

  def set_download_file
    @download_file = current_user.download_files.active.find(params[:id])
  end
end
