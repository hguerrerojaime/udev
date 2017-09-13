class RegionController < RestController

  

  def index
    domain = Domain.find params[:id]
    render json: domain.regions
  end

  def create
    domain = Domain.find params[:id]
    region = Region.create(domain,Cmd::Region::Create.new(@body))
    render json: region, status: :created
  end

  def view
    render json: Region.find(params[:id])
  end

end
