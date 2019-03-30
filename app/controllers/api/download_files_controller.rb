# frozen_string_literal: true

class Api::DownloadFilesController < Api::BaseController
  def index
    @download_files = current_user.download_files
    render json: @download_files
  end
end
