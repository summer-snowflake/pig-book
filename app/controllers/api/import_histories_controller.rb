# frozen_string_literal: true

class Api::ImportHistoriesController < Api::BaseController
  protect_from_forgery except: :create

  def create
    updater = ImportHistory::Updater.new(user: current_user)
    if updater.import(file: import_params[:file])
      head :created
    else
      render_validation_error updater
    end
  end

  def update
    updater = ImportHistory::Updater.new(user: current_user)
    if updater.update(update_params)
      head :ok
    else
      render_validation_error updater
    end
  end

  private

  def import_params
    params.permit(:file)
  end

  def update_params
    params.permit(:id, :row)
  end
end
