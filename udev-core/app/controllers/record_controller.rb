class RecordController < RestController

  def list
    domain_object = DomainObject.find params[:id]
    render json: Record.where(domain_object:domain_object)
  end

  def lookup
    domain_object = DomainObject.find params[:id]
    lookup_list = Record.where(domain_object:domain_object)
    render json: lookup_list.collect { |item| item.to_lookup }
  end

  def create
    domain_object = DomainObject.find params[:id]
    record = Record.insert(domain_object,@body)
    render json: record.to_hash, status: :created
  end

  def view
    render json: Record.find(params[:id]).to_hash
  end

  def update
    record = Record.find params[:id]
    render json: record.update(@body).to_hash
  end



end
