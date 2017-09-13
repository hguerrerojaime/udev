class DoFieldController < RestController

  def index
    domain_object = DomainObject.find(params[:id])
    render json: domain_object.do_fields
  end

  def create
    domain_object = DomainObject.find(params[:id])
    do_field = DoField.create(domain_object,Cmd::DoField::Create.new(@body))
    render json: do_field, status: :created
  end

end
