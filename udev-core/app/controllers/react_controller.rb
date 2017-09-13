class ReactController < ActionController::Base

  def list_component
    @domain_object = DomainObject.find params[:id]

    respond_to do |format|
        format.js {
          render :template => "react/list_component.js.erb"
        }
    end
  end

  def layout
    @layout_instance = Layout.find(params[:id])
    @layout = @layout_instance.to_hash
    @domain_object = @layout_instance.domain_object

    respond_to do |format|
        format.js {
          render :template => "react/layout_#{params[:a]}.js.erb"
        }
    end
  end
end
