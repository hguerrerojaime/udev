class LayoutController < RestController

  def index
    domain_object = DomainObject.find params[:id]
    render json: domain_object.layouts
  end

  def create
    domain_object = DomainObject.find params[:id]
    layout = Layout.create(domain_object,Cmd::Layout::Create.new(@body))
    render json: layout, status: :created
  end

  def view
    render json: Layout.find(params[:id]).to_hash
  end

  def update
    layout = Layout.find params[:id]
    render json: layout.update(Cmd::Layout::Update.new(@body))
  end

end
