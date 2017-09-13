class DomainObjectController < RestController

  def index
     region = Region.find(params[:id])

     render json: region.domain_objects
  end

  def create
    region = Region.find(params[:id])
    domain_object = DomainObject.create(region,Cmd::DomainObject::Create.new(@body))
    render json: domain_object, status: :created
  end

  def view
    render json: DomainObject.find(params[:id])
  end

end
