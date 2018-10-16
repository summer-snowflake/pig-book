# frozen_string_literal: true

class Api::ImportHistoriesController < Api::BaseController
  protect_from_forgery except: :create
  before_action :set_creator, only: %i[
    create_category create_breakdown create_place create_tags create_record
  ]

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

  def create_category
    if @creator.create_category
      head :created
    else
      render_validation_error @creator
    end
  end

  def create_breakdown
    if @creator.create_breakdown
      head :created
    else
      render_validation_error @creator
    end
  end

  def create_place
    if @creator.create_place
      head :created
    else
      render_validation_error @creator
    end
  end

  def create_tags
    if @creator.create_tags
      head :created
    else
      render_validation_error @creator
    end
  end

  def create_record
    if @creator.create_record
      head :created
    else
      render_validation_error @creator
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

  def destroy
    import_history = current_user.import_histories.find(params[:id])
    import_history.destroy
    if import_history.destroyed?
      head :no_content
    else
      render_not_found_error
    end
  end

  def unregistered_count
    import_histories_count =
      current_user.import_histories.send(:unregistered).order(:created_at).count
    render json: import_histories_count
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

  def set_creator
    @creator = ImportHistory::Creator.new(
      user: current_user,
      import_history_id: params[:import_history_id]
    )
  end
end
