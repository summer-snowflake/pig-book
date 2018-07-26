# frozen_string_literal: true

class Api::TemplatesController < Api::BaseController
  before_action :set_template, only: %i[update destroy]

  def index
    @templates = current_user.templates.order(created_at: :desc)
    render json: @templates
  end

  def create
    @template = current_user.templates.new(template_params)
    if @template.save
      head :created
    else
      render_validation_error @template
    end
  end

  def update
    if @template.update_attributes(template_params)
      head :ok
    else
      render_validation_error @template
    end
  end

  def destroy
    @template.destroy
    if @template.destroyed?
      head :no_content
    else
      render_not_found_error
    end
  end

  private

  def set_template
    @template = current_user.templates.find(params[:id])
  end

  def template_params
    params.permit(:name, :category_id, :breakdown_id, :charge, :memo)
  end
end
