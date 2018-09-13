# frozen_string_literal: true

class Api::ImportHistoriesController < Api::BaseController
  protect_from_forgery except: :create

  def index
    import_histories = current_user
                       .import_histories
                       .order(:created_at)
                       .limit(ImportHistory::DISPLAY_LIMIT_COUNT)
    render json: import_histories
  end

  def show
    import_histories = current_user
                       .import_histories
                       .send(status_params)
                       .order(:created_at)
                       .limit(ImportHistory::DISPLAY_LIMIT_COUNT)
    render json: import_histories
  end

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

  def status_params
    params.require(:status)
  end

  def update_params
    params.permit(:id, :row)
  end
end
