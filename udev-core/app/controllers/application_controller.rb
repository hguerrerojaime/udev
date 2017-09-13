class ApplicationController < ActionController::API
  rescue_from ValidationError, :with => :render_validation_error

  def render_validation_error(e)
    render json: e.errors, status: :unprocessable_entity
  end
end
