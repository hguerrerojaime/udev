class DomainController < RestController

  def index
    render json: Domain.all
  end

  def register
    domain = Domain.register(@body["name"],User.register)
    render json: domain, status: :created
  end

  def view
    render json: Domain.find(params[:id])
  end

end
